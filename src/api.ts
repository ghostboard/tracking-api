import {fastify as Fastify, FastifyHttpOptions,FastifyInstance} from 'fastify';
import SECURITY_CONF from './config/security';
import LOGGING_CONFIG from './config/logging.json';
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
	const options: FastifyHttpOptions<any> = {
		logger: LOGGING_CONFIG.loggerOptions,
		trustProxy: true,
	};
	if (LOGGING_CONFIG.disableRequestLogging) {
		options.disableRequestLogging = true;
	}
	const fastify:FastifyInstance = Fastify(options);
	fastify.addHook('onRequest', (req, reply) => {
		if (LOGGING_CONFIG.logRequestStart) {
			req.log.info(`request - ${req.method} ${req.routeOptions.url}`)
		}
		return Promise.resolve()
	});
	fastify.addHook('onResponse', (req, res) => {
		const time = res.elapsedTime.toFixed(2);
		const out = `${res.statusCode} ${res.request.method} ${res.request.routeOptions.url} ${time}ms`;
		req.log.info(out);
		return res;
	});
  fastify.register(require('@fastify/cors'), { origin: '*' });
  fastify.register(require('@fastify/helmet'), SECURITY_CONF.helmet);
  fastify.register(require('fastify-no-icon'));
  fastify.register(require('@fastify/formbody'));
  fastify.register(require('./sources/redis'));
  fastify.register(require('./sources/socketio'));
  await router(fastify);
  return fastify;
}
