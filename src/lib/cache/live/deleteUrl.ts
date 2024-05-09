import { client as cache } from '../../../sources/redis';

export default async function deleteUrl(blogId: string, url: string) {
  const key = `live:blog:${blogId}:urls`;

  return new Promise((resolve, reject) => {
    cache.zrem(key, url, function (reply) {
      return resolve(reply);
    });
  });
}
