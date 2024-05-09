import { client as cache } from '../../../sources/redis';

export default async function incReferer(blogId: string, referer: string) {
  const key = `live:blog:${blogId}:referers`;

  return new Promise((resolve, reject) => {
    cache.zincrby(key, 1, referer, function (e, reply) {
      if (e) {
        return reject(e);
      }
      return resolve(reply);
    });
  });
}
