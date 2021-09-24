import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'fastify-jwt'

export default async function (request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply && reply.send && reply.send(err)
    }
}