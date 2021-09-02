import { client as cache } from '../../../sources/redis'

export default async function deleteCountry(blogId: string, country: string) {
    const key = `live:blog:${blogId}:countries`;

    return new Promise((resolve, reject) => {
        cache.zrem(key, country, function (reply) {
            return resolve(reply);
        });
    });
}