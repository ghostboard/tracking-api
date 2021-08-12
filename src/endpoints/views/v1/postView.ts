import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import moment from "moment"
import db from '../../../db/models'
import { socketio } from '../../../db/socket'
import FEATURES_FLAGS from '../../../config/features'
import getBlogFilters from "../../../lib/cache/getBlogFilters"
import getBlogForVisits from "../../../lib/cache/getBlogForVisits"
import getPostBySlug from "../../../lib/cache/getPostBySlug"
import getSlug from "../../../lib/post/getSlug"
import isBot from "../../../lib/views/isBot"
import isPreview from "../../../lib/views/isPreview"
import saveView from "../../../lib/views/saveView"
import onAddView from "../../../lib/cache/live/onAddView"
import afterView from "../../../lib/blog/afterView"
import emitDashboard from "../../../lib/socket/emitDashboard"
import emitSetup from "../../../lib/socket/emitSetup"

export const method = 'POST'
export const url = '/v1/views/:blogId'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
        const params = (req.params as any)
        const body = (req.body as any)
        const { blogId } = params
        const useragent = req.headers["user-agent"]
        if (!blogId) {
            return res.code(401).send(false);
        }
        if (useragent && isBot(useragent)) {
            return res.code(200).send(false);
        }
        const referer = req.headers["referer"] || ''
        let path = referer
        const userIP = req.ip;
        const [ipFilters, blog] = await Promise.all([
            getBlogFilters(blogId),
            getBlogForVisits(blogId)
        ]);
        if (!blog) {
            return res.code(404).send({ message: `Blog not found with ID=${blogId}` });
        }
        const slug = getSlug(blog, path);
        if (isPreview(slug)) {
            return res.code(200).send(false);
        }
        const enabled = blog && blog.enableClient !== false;
        if (!enabled) {
            return res.code(403).send({ message: "Please reactive your blog on Ghostboard" });
        }
        const dontMatchDomain = blog.domain && referer && referer.indexOf(blog.domain) === -1;
        const isGhostPro = referer && referer.includes('.ghost.io');
        const isWrong = dontMatchDomain && !isGhostPro;
        if (isWrong) {
            return res.code(403).send({ message: `Not allowed to track from ${referer}` });
        }
        const blockIP = ipFilters.includes(userIP);
        if (blockIP) {
            return res.code(200).send(false);
        }

        const pathWithoutQuery = body.U || referer;
        const postSlug = getSlug(blog, pathWithoutQuery, true);
        let post: any = null;
        let postId = null;
        const isHome = !postSlug || postSlug === "/";
        if (!isHome) {
            // search
            post = await getPostBySlug(blogId, postSlug);
            postId = post && post._id ? post._id.toString() : null
        }
        const viewParams = {
            blog,
            post,
            slug,
            postId,
            lang: body.C ? body.C.split("-")[0] : null,
            referer: body.D
        };
        const visit: any = await saveView(viewParams, req);
        const hasVisitId = visit && visit._id;
        if (!hasVisitId) {
            return res.code(401).send(false)
        }
        res.code(200).send(visit._id);

        const newLive: any = {
            blog: blog._id.toString(),
            visit: visit._id.toString(),
            url: visit.url,
            slug: visit.slug,
            mobile: visit.mobile,
            desktop: visit.desktop,
            country: visit.country,
            created: new Date()
        };
        const hasReferer = !!visit.referer;
        const isInternalReferer = hasReferer && visit.referer.includes(params.blog.domain || params.blog.url);
        if (hasReferer && !isInternalReferer) {
            newLive.referer = visit.referer;
            newLive.refererDomain = visit.refererDomain;
            newLive.hasRefererIcon = visit.hasRefererIcon;
        }
        db.Live.create(newLive);
        onAddView(newLive).then(console.log);

        if (FEATURES_FLAGS.VIEW_HEARTBEAT_LOG) {
            const newHeartbeat: any = {
                visit: visit._id,
                url: referer,
                useragent,
                time: 0,
                ip: req.ip,
                created: moment().toDate()
            };
            if (body.G) {
                newHeartbeat.triggerBy = body.G;
            }
            db.LogHeartbeat.create(newHeartbeat);
        }

        params.visit = visit;

        // Save post's first visit if proceed
        const firstPostVisit = params.post && params.post._id && !params.post.firstVisit;
        if (firstPostVisit) {
            const query = {
                _id: params.postId,
                firstVisit: { $exists: false }
            };
            const update = {
                firstVisit: params.visit.created
            };
            db.Post.updateOne(query, update).exec();
        }

        await Promise.all([
            afterView(params, req),
            emitSetup(params, socketio),
            emitDashboard(params, socketio)
        ]);
    } catch (e) {
        console.log('error ', e);
    }
    return res
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}