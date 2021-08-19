import redis from "redis"
import { FastifyInstance } from 'fastify'

export let client: redis.RedisClient;

export default async function (fastify: FastifyInstance): Promise<boolean> {
    client = redis.createClient(getConfig());
    client.on('ready', (e) => {
        fastify.log.info('Redis is ready ✅')

        client.set('testing', 'reading')
        client.expire('testing', 10)
        client.get('testing', (e, data) => {
            fastify.log.info('Redis test is OK ✅')
        })
        
    });
    return true;
}

export function getConfig(): string {
    let config: any = {};
    if (process.env.REDIS_URL) {
        config.url = process.env.REDIS_URL
    } else if (process.env.REDIS_HOST) {
        config.host = process.env.REDIS_HOST
        config.port = process.env.REDIS_PORT
        if (process.env.REDIS_PASSWORD) {
            config.password = process.env.REDIS_PASSWORD
            config.no_ready_check = true
            config.tls = {}
        }
    } else {
        console.log('>> Not available process.env.REDIS... 🚨')
    }
    return config
}