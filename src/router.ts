import { FastifyInstance } from 'fastify';
import fg from 'fast-glob';

export default async function (fastify: FastifyInstance): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production';
  const REMOVE_BEFORE_IMPORT = ['src/', 'build/', '.ts'];
  const SOURCES = [
    isProduction ? './build/controllers/**/*.js' : './src/controllers/**/*.ts',
  ];
  const OPTIONS = {
    dot: true,
    objectMode: false,
    ignore: ['./src/router.ts'],
  };
  const files = await fg(SOURCES, OPTIONS);
  let countDone = 0;
  let countError = 0;

  await Promise.allSettled(
    files.map((file) => {
      try {
        let filePath = file;
        REMOVE_BEFORE_IMPORT.forEach((substring) => {
          filePath = filePath.replace(substring, '');
        });
        const isTest = filePath.includes('.test');
        if (!isTest) {
          const endpoint = require(filePath);
          const isFunction = typeof endpoint?.default === 'function';
          if (isFunction) {
            endpoint.default(fastify);
            countDone += 1;
          }
        }
      } catch (e) {
        countError += 1;
        fastify.log.error(e);
      }
    })
  );
  fastify.log.info(`${countDone} endpoints ready 🚀`);
  if (countError) {
    fastify.log.info(`${countError} endpoints failed 🚨`);
  }
}
