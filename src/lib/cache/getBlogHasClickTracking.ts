import moment from 'moment'
import mongodb from '../../models'
import { client as cache } from '../../sources/redis'
import db from "../../sources/postgres"

export default async function getBlogHasClickTracking(blogId: string) :Promise<any> {
    const key = `blog:${blogId}:hasClickTracking`;
    const expiration = 10 * 60;
    return new Promise((resolve, reject) => {
        cache.get(key, async(err, item) => {
            if (err) {
                return reject(err);
            }
            if (item) {
                let data = JSON.parse(item)
                if (typeof data === 'string') {
                    data = JSON.parse(data)
                }
                return resolve(data);
            }
            // const select = 'user firstVisit';
            // const query = {
            //     $or: [
            //         { _id: blogId },
            //         { trackingId: blogId }
            //     ]
            // };
            // const blog = await mongodb.Blog.findOne(query).select(select).lean();
						const blog = await db('blogs')
							.select('user', 'firstVisit')
							.where('id', blogId)
							.orWhere('trackingId', blogId).first();
						const user = await db('users')
							.select('trialDays', 'plan')
		          .where('id', blog.user).first();
						const plan = await db('plans').where('id', user.plan).first();
						// const user = await mongodb.User.findById(blog.user).select('trialDays plan').populate('plan').lean();
	          const daysFromFirstVisit = moment().diff(moment(blog.firstVisit), 'days');
	          const trialDaysLeft = user.trialDays - daysFromFirstVisit;
						const isFreeTrial = trialDaysLeft >= 0;
						const planHasClicks = plan?.hasClicks === true;
						const output = isFreeTrial || planHasClicks;
						cache.setex(key, expiration, JSON.stringify(output));
            resolve(output);
        });
    });
}