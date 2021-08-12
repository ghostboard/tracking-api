import { client as cache } from '../../../db/cache'

export default async function getView(viewId: string) :Promise<string> {
    const key = `live:view:${viewId}`;
    
    return new Promise((resolve, reject) => {
        cache.get(key, async(err, item) => {
            if (err) {
                return reject(err);
            }
            if (item) {
                return resolve(JSON.stringify(item));
            }
            resolve('');
        });
    });
}