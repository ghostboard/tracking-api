import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

export const method = 'POST'
export const url = '/v1/views'
export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<Boolean> {
    return true
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}