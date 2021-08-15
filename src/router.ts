import { FastifyInstance } from "fastify"
import fg from 'fast-glob'

export default async function (fastify: FastifyInstance): Promise<void> {
    const BASE_FOLDER = 'src/'
    const files = await fg(['./src/controllers/**/*.ts'], { dot: true, objectMode: false, ignore: ['./src/router.ts'] })
    let countDone = 0
    let countError = 0

    await Promise.all(files.map((file) => {
        try {
            const filePath = file.replace(BASE_FOLDER, '').replace('.ts', '')
            const endpoint = require(filePath)
            endpoint.default(fastify)
            countDone += 1
        } catch (e) {
            countError += 1
            fastify.log.error(e)
        }
    }));
    fastify.log.info(`${countDone} endpoints ready 🚀`)
    if (countError) {
        fastify.log.info(`${countError} endpoints failed 🚨`)
    }
}