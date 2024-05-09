import { client as cache } from '../../../sources/redis';

export default async function incTotalViews(blogId: string) {
  const key = `live:blog:${blogId}:count:total`;

  return new Promise((resolve, reject) => {
    cache.incr(key, function (e, reply) {
      if (e) {
        return reject(e);
      }
      return resolve(reply);
    });
  });
}
