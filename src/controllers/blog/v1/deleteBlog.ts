import { FastifyRequest, FastifyReply } from "fastify"
import deleteBlog from "../../../logic/blog/deleteBlog"

export const method = 'DELETE'
export const url = '/v1/blogs/:blogId'
export async function handler(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    const jwt: any = req.user
    const { userId, managerId } = jwt
    const urlParams = (req.params as any)
    const { blogId } = urlParams
    const out = await deleteBlog(blogId, managerId || userId)
    return reply.code(200).send(out)
}

export default function (fastify: any) {
    fastify.route({
        method,
        url,
        handler,
        preValidation: [fastify.authJWT]
    })
}