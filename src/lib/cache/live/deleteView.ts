import { client as cache } from '../../../db/cache'

export default async function deleteView(viewId: string) {
    const key = `live:view:${viewId}`;
    const dataKey = `view:${viewId}`;
    
    return new Promise((resolve, reject) => {
        cache.del(key, (err, out) => {
            if (err) {
                return reject(err);
            }
            cache.del(dataKey)
            resolve(out);
        });
    });
}