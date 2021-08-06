import { fastify as Fastify } from 'fastify'
import loader from './loader'

const fastify = Fastify({
    logger: { prettyPrint: true },
    trustProxy: true
})

const start = async () => {
    try {
        fastify.register(require('fastify-env'), { confKey: 'ENV', dotenv: true, schema: { type: 'object' } })
        fastify.register(require('fastify-cors'))
        fastify.register(require('fastify-helmet'))
        fastify.register(require('fastify-no-icon'))
        fastify.register(require('./db/connect'))
        fastify.register(require('./db/cache'))
        await loader(fastify)
        await fastify.listen(process.env.PORT || 4000)
        fastify.log.info('Server started successfully ✅')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};
start()