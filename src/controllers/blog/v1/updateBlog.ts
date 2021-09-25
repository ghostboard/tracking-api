import { FastifyRequest, FastifyReply } from "fastify"
import undoDeleteBlog from "../../../logic/blog/undoDeleteBlog"

export const method = 'PATCH'
export const url = '/v1/blogs/:blogId'
export async function handler(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    const jwt: any = req.user
    const { userId, managerId } = jwt
    const urlParams = (req.params as any)
    const { blogId } = urlParams
    const body = (req.body as any)
    let done = false
    if (body.undoDelete == 'true') {
        done = await undoDeleteBlog(blogId, managerId || userId)
    }
    return reply.code(200).send(done)
}

export default function (fastify: any) {
    fastify.route({
        method,
        url,
        handler,
        preValidation: [fastify.authJWT]
    })
}