import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import serveTransparentGif from "../../../lib/server/serveTransparentGif"
import getBlogFilters from "../../../lib/cache/getBlogFilters"
import getBlogForVisits from "../../../lib/cache/getBlogForVisits"
import getPostBySlug from "../../../lib/cache/getPostBySlug"
import getSlug from "../../../lib/post/getSlug"
import isBot from "../../../lib/views/isBot"
import isPreview from "../../../lib/views/isPreview"
import saveView from "../../../lib/views/saveView"

export const method = 'GET'
export const url = '/noscript/:id/pixel.gif'

export async function handler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const path = req.headers["referer"]
    if (!path) {
        return serveTransparentGif(res);
    }
    const params: { [index: string]: any } = (req.params as object);
    const hasBlogId = params && params.id;
    if (!hasBlogId) {
        return res.code(401).send(false);
    }
    const useragent = req.headers["user-agent"]
    if (useragent && isBot(useragent)) {
        return res.code(200).send(false);
    }
    const blogId = params.id
    const userIp = req.ip
    const [ipFilters, blog] = await Promise.all([
        getBlogFilters(blogId),
        getBlogForVisits(blogId)
    ]);
    if (!blog) {
        return res.code(404).send({ message: `Blog not found with ID=${blogId}` })
    }
    const slug = getSlug(blog, path)
    if (isPreview(slug)) {
        return res.code(200).send(false);
    }
    const enabled = blog && (blog as any).enableClient !== false
    if (!enabled) {
        return res.code(403).send({ message: "Please reactive your blog on Ghostboard" })
    }

    const referer = req.headers["referer"]
    const dontMatchDomain = blog.domain && referer && referer.indexOf(blog.domain) === -1
    const isGhostPro = referer && referer.includes('.ghost.io')
    const isWrong = dontMatchDomain && !isGhostPro
    if (isWrong) {
        return res.code(403).send({ message: `Not allowed to track from ${referer}` })
    }
    const blockIP = ipFilters.includes(userIp)
    if (blockIP) {
        return res.code(200).send(false)
    }

    const pathWithoutQuery = referer || ''
    const postSlug = getSlug(blog, pathWithoutQuery, true)
    let post: any = null
    let postId = null
    const isHome = !postSlug || postSlug === "/"
    if (!isHome) {
        // search
        post = await getPostBySlug(blogId, postSlug)
        postId = post && post._id ? post._id.toString() : null
    }

    let lang = '';
    if (req.headers['accept-language']) {
        lang = req.headers['accept-language'].split(',')[0].split('-')[0] || '';
    }
    const visitParams = {
        blog,
        post,
        slug,
        postId,
        lang,
        referer,
        isNoscript: true
    };
    await saveView(visitParams, req);
    return serveTransparentGif(res);
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}