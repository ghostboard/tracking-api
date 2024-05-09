import { client as cache } from '../../../sources/redis';

export default async function getView(viewId: string): Promise<any> {
  const key = `view:${viewId}`;

  return new Promise((resolve, reject) => {
    cache.get(key, async (err, item) => {
      if (err) {
        return reject(err);
      }
      if (item) {
        let data = JSON.parse(item);
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        return resolve(data);
      }
      resolve('');
    });
  });
}
