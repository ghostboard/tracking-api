import { client as cache } from '../../../db/cache'

export default async function incMobileViews(blogId: string) {
    const key = `live:blog:${blogId}:count:mobile`;

    return new Promise((resolve, reject) => {
        cache.incr(key, function (e, reply) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}