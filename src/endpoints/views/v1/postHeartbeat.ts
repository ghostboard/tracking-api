import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

export const method = 'POST'
export const url = '/v1/views/:id/heartbeat'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<Boolean> {
    
    return true
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}