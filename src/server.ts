import dotenv from 'dotenv'
import { fastify as Fastify } from 'fastify'
import SECURITY_CONF from './config/security'
import router from './router'
import verifyJWT from './controllers/verifyJWT'
dotenv.config()

const isProduction = process.env.NODE_ENV == 'production'
const fastify = Fastify({
    logger: { prettyPrint: !isProduction },
    trustProxy: true
})

const start = async () => {
    try {
        fastify.register(require('fastify-cors'), { origin: '*' })
        fastify.register(require('fastify-helmet'), SECURITY_CONF.helmet)
        fastify.register(require('fastify-no-icon'))
        fastify.register(require('fastify-formbody'))
        fastify.register(require('fastify-jwt'), { secret: process.env.JWT_SECRET })
        fastify.register(require('fastify-compress'))
        fastify.register(require('./sources/mongodb'))
        fastify.register(require('./sources/redis'))
        fastify.register(require('./sources/socketio'))
        fastify.decorate('authJWT', verifyJWT)
        await router(fastify)
        await fastify.listen(process.env.PORT || 4000)
        fastify.log.info('Server started successfully ✅')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};
start()