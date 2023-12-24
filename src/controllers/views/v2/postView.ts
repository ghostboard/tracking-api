import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import libIP from "ipaddr.js"
import getBlogFilters from "../../../lib/cache/getBlogFilters"
import getBlogForVisits from "../../../lib/cache/getBlogForVisits"
import getBlogHasClickTracking from "../../../lib/cache/getBlogHasClickTracking"
import getPostBySlug from "../../../lib/cache/getPostBySlug"
import getSlug from "../../../lib/post/getSlug"
import isBot from "../../../lib/views/isBot"
import isPreview from "../../../lib/views/isPreview"
import saveView from "../../../lib/views/saveView"
import onAddView from "../../../lib/cache/live/onAddView"
import afterView from "../../../lib/blog/afterView"
import emitDashboard from "../../../lib/socket/emitDashboard"
import emitSetup from "../../../lib/socket/emitSetup"
import updateFirstVisit from "../../../services/post/updateFirstVisit";

export const method = 'POST'
export const url = '/v2/views/:blogId'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
        const params = (req.params as any)
        const body = (req.body as any)
        const { blogId } = params
        const useragent = req.headers["user-agent"]
        if (!blogId) {
            return res.code(401).send();
        }
        if (useragent && isBot(useragent)) {
            return res.code(204).send();
        }
        const referer = req.headers["referer"] || ''
        const path = body.U || referer
        const userIP = req.ip;
        const [ipFilters, blog, blogHasClickTracking] = await Promise.all([
					getBlogFilters(blogId),
	        getBlogForVisits(blogId),
	        getBlogHasClickTracking(blogId)
        ]);
        if (!blog) {
            return res.code(404).send({ message: `Blog not found with ID=${blogId}` });
        }
        const slug = getSlug(blog, path, true, true);
        if (isPreview(slug)) {
            return res.code(204).send(`Slug preview`);
        }
        const enabled = blog && blog.enableClient !== false;
        if (!enabled) {
            return res.code(204).send({ message: "Please reactive your blog on Ghostboard" });
        }
        const dontMatchDomain = blog.domain && referer && referer.indexOf(blog.domain) === -1;
				const dontMatchNewDomain = blog.newDomain && referer && !referer.includes(blog.newDomain);
        const isGhostPro = referer && referer.includes('.ghost.io');
	      const dontMatchAnyDomain = dontMatchDomain && dontMatchNewDomain;
	      const isWrong = dontMatchAnyDomain && !isGhostPro;
        if (isWrong) {
            return res.code(204).send({ message: `Not allowed to track from ${referer}` });
        }
				const isPrivateIP = libIP.parse(userIP).range() === 'private'
        const blockIP = !isPrivateIP && ipFilters.includes(userIP);
        if (blockIP) {
					console.log(`>> block IP ${userIP} ${ipFilters} isPrivate=${isPrivateIP}`)
	        console.log('>> req.ip', req.ip)
	        console.log('>> req.ips', req.ips)
	        console.log('>> req.headers[\'x-forwarded-for\']', req.headers['x-forwarded-for'])
	        console.log(`>> req.headers['X-Real-IP'] = ${req.headers['x-real-ip']} / ${req.headers['X-Real-IP']}`)
            return res.code(204).send(false);
        }

        const postSlug = getSlug(blog, path, true);
        let post: any = null;
        let postId = null;
        const isHome = !postSlug || postSlug === "/";
        if (!isHome) {
            // search
            post = await getPostBySlug(blogId, postSlug);
            postId = post && (post.id || post._id) ? (post.id || post._id.toString()) : null
        }
        const viewParams = {
            blog,
            post,
            slug,
	          blogId,
            postId,
            lang: body.C ? body.C.split("-")[0] : null,
            referer: body.D,
            visit: {}
        };
        const visit: any = await saveView(viewParams, req);
        const visitId = visit && (visit.id || visit._id);
        if (!visitId) {
            return res.code(401).send(false)
        }
				const output: any = {
					id: visitId,
					tc: blogHasClickTracking ? 1 : 0
				}
        res.code(200).send(output);

        const newLive: any = {
            blog: blogId,
            visit: visit.id || visit._id.toString(),
            url: visit.url,
            slug: visit.slug,
            mobile: visit.mobile,
            desktop: visit.desktop,
            country: visit.country,
            created: new Date()
        };
        const hasReferer = !!visit.referer;
        const isInternalReferer = hasReferer && visit.referer.includes(viewParams.blog.domain || viewParams.blog.url);
        if (hasReferer && !isInternalReferer) {
            newLive.referer = visit.referer;
            newLive.refererDomain = visit.refererDomain;
            newLive.hasRefererIcon = visit.hasRefererIcon;
        }
        onAddView(newLive).then();

        viewParams.visit = visit;

        // Save post's first visit if proceed
        const firstPostVisit = post && (post.id || post._id) && !post.firstVisit;
        if (firstPostVisit) {
            const update = {
                firstVisit: visit.created
            };
	          updateFirstVisit((post.id || post._id), update.firstVisit).then();
        }

        const todoAfterPost = [
            afterView(viewParams, req),
            emitDashboard(blogId)
        ]
        const shouldEmitSetup = blog && !blog.firstVisit
        if (shouldEmitSetup) {
            todoAfterPost.push(emitSetup(blogId))
        }
        await Promise.all(todoAfterPost);
    } catch (e) {
        console.error('Error postView ', e);
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