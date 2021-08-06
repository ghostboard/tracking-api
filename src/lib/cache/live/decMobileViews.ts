import { client as cache } from '../../../db/cache'

export default async function decMobileViews(blogId: string) {
    const key = `live:blog:${blogId}:count:mobile`;

    return new Promise((resolve, reject) => {
        cache.decr(key, function (e: any, reply: number) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}