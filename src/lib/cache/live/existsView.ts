import { client as cache } from '../../../db/cache'

export default async function existsView(viewId: string) {
    const key = `live:view:${viewId}`;
    
    return new Promise((resolve, reject) => {
        cache.exists(key, (err, item) => {
            if (err) {
                return reject(err);
            }
            return resolve(item >= 1);
        });
    });
}