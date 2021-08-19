import { client as cache } from '../../../sources/redis'

export default async function decUrl(blogId: string, url: string) {
    const key = `live:blog:${blogId}:urls`;

    return new Promise((resolve, reject) => {
        cache.zincrby(key, -1, url, function (e, reply) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}