import { client as cache } from '../../../db/cache'

const SIX_HOUR = 6 * 60 * 60;

export default async function setView(liveView: object) {
    const viewId = (liveView as any).visit;
    const key = `live:view:${viewId}`;
    const expiration = SIX_HOUR;

    return new Promise((resolve, reject) => {
        const proceed = liveView && viewId;
        if (!proceed) {
            return resolve(false);
        }
        cache.setex(key, expiration, JSON.stringify(liveView));
        resolve(true);
    });
}