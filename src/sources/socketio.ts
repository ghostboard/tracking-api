import redis from 'redis';
import { Emitter } from '@socket.io/redis-emitter';
import { FastifyInstance } from 'fastify';
import { getConfig } from './redis';

export let redisClient: redis.RedisClient;
export let socketio: Emitter;

export default async function (fastify: FastifyInstance): Promise<boolean> {
  try {
    redisClient = redis.createClient(getConfig());
    socketio = new Emitter(redisClient);
  } catch (e) {
    fastify.log.info('Error loading socket.io 🚨');
    fastify.log.error(e);
  } finally {
    return true;
  }
}
