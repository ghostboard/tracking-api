import redis from "redis"
import { FastifyInstance } from 'fastify'

export let client: redis.RedisClient;

export default async function (fastify: FastifyInstance): Promise<boolean> {
    const config = {
        url: process.env.REDIS_URL
    };
    client = redis.createClient(config);
    client.on('ready', (e) => {
        fastify.log.info('Redis is ready ✅')
        // client.config("SET", "notify-keyspace-events", "Ex");

        client.set('testing', 'reading')
        client.expire('testing', 10)
        client.get('testing', (e, data) => {
            fastify.log.info('Redis test is OK ✅')
        })
        
    });
    return true;
}