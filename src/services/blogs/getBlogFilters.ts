import { client as cache } from '../../sources/redis';
import db from '../../sources/postgres';

export default async function getBlogFilters(
  blogId: string
): Promise<string[]> {
  const key = `blog:${blogId}:ip_filters`;
  const expirationSeconds = 5 * 60;

  return new Promise((resolve, reject) => {
    cache.get(key, async (err, list) => {
      if (err) {
        return reject(err);
      }
      if (list) {
        return resolve(JSON.parse(list));
      }
      const filters = await db('blog_filters')
        .select('ip')
        .where('blog', blogId)
        .whereNull('deleted');
      const ipList = filters.map((item: any) => item.ip);
      cache.setex(key, expirationSeconds, JSON.stringify(ipList));
      resolve(ipList);
    });
  });
}
