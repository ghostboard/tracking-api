import { client as cache } from '../../../sources/redis'

export default async function incDesktopViews(blogId: string) {
    const key = `live:blog:${blogId}:count:desktop`;

    return new Promise((resolve, reject) => {
        cache.incr(key, function (e, reply) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}