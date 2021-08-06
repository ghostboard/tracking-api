import { client as cache } from '../../../db/cache'

const ONE_HOUR = 1 * 60 * 60;

export default async function setView(liveView: object) {
    const viewId = (liveView as any).visit;
    const key = `live:view:${viewId}`;
    const expiration = ONE_HOUR;

    return new Promise((resolve, reject) => {
        const proceed = liveView && viewId;
        if (!proceed) {
            return resolve(false);
        }
        cache.setex(key, expiration, JSON.stringify(liveView));
        resolve(true);
    });
}