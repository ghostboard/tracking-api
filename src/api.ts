import { fastify as Fastify } from 'fastify';
import SECURITY_CONF from './config/security';
import router from './router';

const isProduction = process.env.NODE_ENV === 'production';
const isQA = process.env.NODE_ENV === 'qa';
const importDotenv = !isProduction && !isQA;
if (importDotenv) {
  // @ts-ignore
  const dotenv = require('dotenv');
  dotenv.config();
}

export default async function build() {
  const fastify = Fastify({
    logger: { prettyPrint: !isProduction },
    trustProxy: true,
  });
  fastify.register(require('fastify-cors'), { origin: '*' });
  fastify.register(require('fastify-helmet'), SECURITY_CONF.helmet);
  fastify.register(require('fastify-no-icon'));
  fastify.register(require('fastify-formbody'));
  fastify.register(require('./sources/redis'));
  fastify.register(require('./sources/socketio'));
  await router(fastify);
  return fastify;
}
