import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import db from '../db/models'
import { client as cache } from '../db/cache'

export const method = 'GET'
export const url = '/'
export async function handler(request: FastifyRequest, reply: FastifyReply): Promise<Boolean> {
    console.log('>>> hola!')
    console.log('>> redis', cache);
    // const { redis } = fastify;
    // console.log('>> fastify redis', redis);
    // console.log('>> fastify db', db);
    // const data = await Visit.findOne().lean();
    return true
}

export default function (fastify: FastifyInstance) {
    // fastify.log.info('>> fastify');
    fastify.route({
        method,
        url,
        handler
    })
}