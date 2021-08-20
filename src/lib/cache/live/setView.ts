import { client as cache } from '../../../sources/redis'

const MINUTES = 5;
const EXPIRATION = MINUTES * 60;

export default async function setView(liveView: object) {
    const viewId = (liveView as any).visit;
    const dataKey = `view:${viewId}`;
    const key = `live:view:${viewId}`;
    const expiration = EXPIRATION;

    return new Promise((resolve, reject) => {
        const proceed = liveView && viewId;
        if (!proceed) {
            return resolve(false);
        }
        cache.setex(key, expiration, JSON.stringify(liveView));
        cache.setex(dataKey, expiration*2, JSON.stringify(liveView));
        resolve(true);
    });
}