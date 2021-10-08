import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

export const method = 'GET'
export const url = '/ping'
export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<number> {
    return 1
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}