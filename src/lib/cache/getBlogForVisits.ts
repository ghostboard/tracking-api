import db from '../../models'
import { client as cache } from '../../sources/redis'

export default async function getBlogForVisits(blogId: string) :Promise<any> {
    const key = `blog:${blogId}:for_visits`;
    const expiration = 5 * 60;
    return new Promise((resolve, reject) => {
        cache.get(key, async(err, item) => {
            if (err) {
                return reject(err);
            }
            if (item) {
                return resolve(JSON.parse(item));
            }
            const select = 'url domain enableClient firstVisit filterOwnIP filterTeamIP user active';
            const query = {
                $or: [
                    { _id: blogId },
                    { trackingId: blogId }
                ]
            };
            const blog = await db.Blog.findOne(query).select(select).lean();
            if (blog && blog.firstVisit) {
                cache.setex(key, expiration, JSON.stringify(blog));
            }
            resolve(blog);
        });
    });
}