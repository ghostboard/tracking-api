import { fastify as Fastify } from 'fastify'
import loader from './loader'

const isProduction = process.env.NODE_ENV == 'production'
const fastify = Fastify({
    logger: { prettyPrint: !isProduction },
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
        fastify.register(require('./db/socket'))
        await loader(fastify)
        await fastify.listen(process.env.PORT || 4000)
        fastify.log.info('Server started successfully ✅')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};
start()