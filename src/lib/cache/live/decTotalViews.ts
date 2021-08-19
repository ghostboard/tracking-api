import { client as cache } from '../../../sources/redis'

export default async function decTotalViews(blogId: string) {
    const key = `live:blog:${blogId}:count:total`;

    return new Promise((resolve, reject) => {
        cache.decr(key, function (e, reply) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}