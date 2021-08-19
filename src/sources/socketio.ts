import redis from "redis"
import { Emitter } from "@socket.io/redis-emitter";
import { FastifyInstance } from 'fastify'

export let redisClient: redis.RedisClient;
export let socketio: Emitter;

export default async function (fastify: FastifyInstance): Promise<boolean> {
    try {
        const config = {
            url: process.env.REDIS_URL
        };
        redisClient = redis.createClient(config)
        socketio = new Emitter(redisClient)
    } catch (e) {
        fastify.log.info('Error loading socket.io 🚨');
        fastify.log.error(e)
    } finally {
        return true
    }
}