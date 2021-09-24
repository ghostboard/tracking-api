import { FastifyRequest, FastifyReply } from "fastify"
import deleteBlog from "../../../logic/blog/deleteBlog"

export const method = 'DELETE'
export const url = '/v1/blogs/:blogId'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<any> {
    const jwt: any = req.user
    const { blogId } = jwt
    const out = await deleteBlog(blogId)
    return out
}

export default function (fastify: any) {
    fastify.route({
        method,
        url,
        handler,
        preValidation: [fastify.authJWT]
    })
}