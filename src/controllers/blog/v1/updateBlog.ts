import { FastifyRequest, FastifyReply } from "fastify"
import undoDeleteBlog from "../../../logic/blog/undoDeleteBlog"

export const method = 'PATCH'
export const url = '/v1/blogs/:blogId'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<any> {
    const jwt: any = req.user
    const { blogId } = jwt
    const body = (req.body as any)
    let done = false
    if (body.undoDelete === true) {
        done = await undoDeleteBlog(blogId)
    }
    return done
}

export default function (fastify: any) {
    fastify.route({
        method,
        url,
        handler,
        preValidation: [fastify.authJWT]
    })
}