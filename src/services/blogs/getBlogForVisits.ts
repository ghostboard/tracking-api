import { client as cache } from '../../sources/redis';
import db from '../../sources/postgres';

export default async function getBlogForVisits(blogId: string): Promise<any> {
  const key = `blog:${blogId}:for_visits`;
  const expirationSeconds = 5 * 60;
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
        const hasBlogId = data && data.id;
        if (hasBlogId) {
          return resolve(data);
        }
      }
      const blog = await db('blogs')
        .select(
          'id',
          'url',
          'domain',
          'newDomain',
          'enableClient',
          'firstVisit',
          'filterOwnIP',
          'filterTeamIP',
          'user',
          'active'
        )
        .where('id', blogId)
        .orWhere('trackingId', blogId)
        .first();
      if (blog && blog.firstVisit) {
        cache.setex(key, expirationSeconds, JSON.stringify(blog));
      }
      resolve(blog);
    });
  });
}
