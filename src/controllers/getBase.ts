import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export const method = 'GET'
export const url = '/'
export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.status(200).send()
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}