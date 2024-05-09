import { client as cache } from '../../../sources/redis';

export default async function getCountTotalViews(
  blogId: string
): Promise<number> {
  const key = `live:blog:${blogId}:count:total`;

  return new Promise((resolve, reject) => {
    cache.get(key, (err, item) => {
      if (err) {
        return reject(err);
      }
      const value = parseInt(item || '0');
      return resolve(value);
    });
  });
}
