import build from './api';

const isProduction = process.env.NODE_ENV == 'production';
export default async function start() {
  let api;
  try {
    if (isProduction) {
      require('@newrelic/fastify');
    }
    api = await build();
    await api.listen(process.env.PORT, '0.0.0.0');
    api.log.info('Tracking API started successfully ✅');
    return api;
  } catch (err) {
    api?.log?.error(err) || console.error(err);
    process.exit(1);
  }
}

start();
