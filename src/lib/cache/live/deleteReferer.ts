import { client as cache } from '../../../sources/redis'

export default async function deleteReferer(blogId: string, referer: string) {
    const key = `live:blog:${blogId}:referers`;

    return new Promise((resolve, reject) => {
        cache.zrem(key, referer, function (reply) {
            return resolve(reply);
        });
    });
}