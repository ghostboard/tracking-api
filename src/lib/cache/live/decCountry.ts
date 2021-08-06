import { client as cache } from '../../../db/cache'

export default async function decCountry(blogId: string, country: string) {
    const key = `live:blog:${blogId}:countries`;

    return new Promise((resolve, reject) => {
        cache.zincrby(key, -1, country, function (e: any, reply: string) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}