import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export const method = 'GET'
export const url = '/'
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