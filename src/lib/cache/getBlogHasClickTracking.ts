import moment from 'moment';
import { client as cache } from '../../sources/redis';
import db from '../../sources/postgres';

export default async function getBlogHasClickTracking(
  blogId: string
): Promise<any> {
  const key = `blog:${blogId}:hasClickTracking`;
  const expirationSeconds = 10 * 60;
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
      const blog: any = await db('blogs')
        .select('user', 'firstVisit')
        .where('id', blogId)
        .orWhere('trackingId', blogId)
        .first();
      const hasUser = blog && blog.user;
      if (!hasUser) {
        return resolve(false);
      }
      const user: any = await db('users')
        .select('trialDays', 'plan')
        .where('id', blog.user)
        .first();
      let output = true;
      try {
        const hasPlan = user && user.plan;
        if (!hasPlan) {
          console.log('>> error user/plan not found', blogId, blog, user);
          return resolve(false);
        }
        const plan: any = await db('plans').where('id', user.plan).first();
        const daysFromFirstVisit = moment().diff(
          moment(blog.firstVisit),
          'days'
        );
        const trialDaysLeft = user.trialDays - daysFromFirstVisit;
        const isFreeTrial = trialDaysLeft >= 0;
        const planHasClicks = plan?.hasClicks === true;
        output = isFreeTrial || planHasClicks;
        cache.setex(key, expirationSeconds, JSON.stringify(output));
        resolve(output);
      } catch (e) {
        console.error('>> getBlogHasClickTracking', blogId, e);
        resolve(true);
      }
    });
  });
}
