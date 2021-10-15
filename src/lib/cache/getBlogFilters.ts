import db from '../../models'
import { client as cache } from '../../sources/redis'

export default async function getBlogFilters(blogId: string) :Promise<string[]> {
    const key = `blog:${blogId}:ip_filters`;
    const expiration = 5 * 60;
    
    return new Promise((resolve, reject) => {
        cache.get(key, async(err, list) => {
            if (err) {
                return reject(err);
            }
            if (list) {
                return resolve(JSON.parse(list));
            }
            const query = {
                blog: blogId,
                deleted: {
                    $exists: false
                }
            };
            const filters = await db.BlogFilter.find(query).select('ip').lean();
            const ipList = filters.map((item: any) => item.ip);
            cache.setex(key, expiration, JSON.stringify(ipList));
            resolve(ipList);
        });
    });
}