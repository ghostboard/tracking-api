import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import create from "../../../logic/click/create"

export const method = 'GET'
export const url = '/:blogId/c.gif'
export async function handler(req: FastifyRequest, reply: FastifyReply): Promise<number> {
    const urlParams = (req.params as any)
    const queryParams = (req.query as any)
    const { blogId } = urlParams
    const { 
        l: target,
        t: title,
        a: text,
        i: image 
    } = queryParams
    const origin = req.headers["referer"] || ''
    const out = await create(blogId, origin, target, title, text, image)
    return reply.code(200).send(1)
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}