import { client as cache } from '../../../sources/redis'

const MINUTES = 5
// 5 minutes
const EXPIRATION = MINUTES * 60
// 15 minutes copy (fallback)
const COPY_EXPIRATION = MINUTES * 3 * 60
//  30 minutes view data
const DATA_EXPIRATION = COPY_EXPIRATION * 2

export default async function setView(liveView: object) {
    const viewId = (liveView as any).visit;
    const dataKey = `view:${viewId}`;
    const key = `live:view:${viewId}`;
    const keyCopy = `live:view:copy:${viewId}`;

    return new Promise((resolve, reject) => {
        const proceed = liveView && viewId;
        if (!proceed) {
            return resolve(false);
        }
        cache.setex(key, EXPIRATION, JSON.stringify(liveView));
        cache.setex(keyCopy, COPY_EXPIRATION, JSON.stringify(liveView));
        cache.setex(dataKey, DATA_EXPIRATION, JSON.stringify(liveView));
        resolve(true);
    });
}