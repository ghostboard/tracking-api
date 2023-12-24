import { FastifyInstance } from "fastify"
import fg from 'fast-glob'

export default async function (fastify: FastifyInstance): Promise<void> {
		const REMOVE_BEFORE_IMPORT = ['src/', 'build/', '.ts']
		const BASE_FOLDER = '/controllers/'
		const SOURCES = [
			'./src/controllers/**/*.ts',
			'./build/controllers/**/*.js'
		]
		const OPTIONS = {
			dot: true,
			objectMode: false,
			ignore: ['./src/router.ts']
		}
    const files = await fg(SOURCES, OPTIONS)
    let countDone = 0
    let countError = 0

    await Promise.all(files.map((file) => {
        try {
	        let filePath = file;
	        REMOVE_BEFORE_IMPORT.forEach((substring) => {
		        filePath = filePath.replace(substring, '');
	        });
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