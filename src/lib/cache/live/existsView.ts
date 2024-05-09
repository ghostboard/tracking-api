import { client as cache } from '../../../sources/redis';

export default async function existsView(viewId: string): Promise<boolean> {
  const key = `live:view:${viewId}`;

  return new Promise((resolve, reject) => {
    cache.exists(key, (err, item) => {
      if (err) {
        return reject(err);
      }
      return resolve(item >= 1);
    });
  });
}
