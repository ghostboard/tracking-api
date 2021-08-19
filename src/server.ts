import { fastify as Fastify } from 'fastify'
import router from './router'

const isProduction = process.env.NODE_ENV == 'production'
const fastify = Fastify({
    logger: { prettyPrint: !isProduction },
    trustProxy: true
})

const start = async () => {
    try {
        await fastify.register(require('fastify-env'), { confKey: 'ENV', dotenv: true, schema: { type: 'object' } })
        fastify.register(require('fastify-cors'), { origin: '*' })
        fastify.register(require('fastify-helmet'))
        fastify.register(require('fastify-no-icon'))
        fastify.register(require('./sources/mongodb'))
        fastify.register(require('./sources/redis'))
        fastify.register(require('./sources/socketio'))
        await router(fastify)
        await fastify.listen(process.env.PORT || 4000)
        fastify.log.info('Server started successfully ✅')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};
start()