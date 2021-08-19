import { client as cache } from '../../../sources/redis'

export default async function decDesktopViews(blogId: string) {
    const key = `live:blog:${blogId}:count:desktop`;

    return new Promise((resolve, reject) => {
        cache.decr(key, function (e: any, reply: number) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}