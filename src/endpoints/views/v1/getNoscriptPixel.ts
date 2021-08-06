import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import serveTransparentGif from "../../../lib/server/serveTransparentGif"
import isBot from "../../../lib/views/isBot"

export const method = 'GET'
export const url = '/v1/noscript/:id/pixel.gif'

export async function handler(req: FastifyRequest, res: FastifyReply): Promise<Boolean> {
    const path = req.headers["referer"];
    if (!path) {
        return serveTransparentGif(res);
    }
    const params: { [index: string]: any } = (req.params as object);
    const hasBlogId = params && params.id;
    if (!hasBlogId) {
        return res.code(401).send(false);
    }
    const useragent = req.headers["user-agent"];
    if (useragent && isBot(useragent)) {
        console.log('>> useragent is bot', useragent)
        return res.code(200).send(false);
    }
    const blogId = params.id;
    const userIp = req.ip;
    
    return true
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}