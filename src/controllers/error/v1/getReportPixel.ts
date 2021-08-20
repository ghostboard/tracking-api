import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import serveTransparentGif from "../../../lib/server/serveTransparentGif"
import report from "../../../logic/error/report"

export const method = 'GET'
export const url = '/:blogId/e.gif'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const urlParams = (req.params as any)
    const queryParams = (req.query as any)
    const { blogId } = urlParams
    const { l: location, e: error } = queryParams
    const useragent = req.headers["user-agent"] || ''
    const referer = req.headers["referer"] || ''
    const out = await report(blogId, location, error, useragent, referer)
    return serveTransparentGif(res)
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}