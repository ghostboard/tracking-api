import { client as cache } from '../../../sources/redis'

export default async function getReferer(blogId: string, referer: string) :Promise<number>{
    const key = `live:blog:${blogId}:referers`;
    
    return new Promise((resolve, reject) => {
        cache.zscore(key, referer, (err, item) => {
            if (err) {
                return reject(err);
            }
            const value = parseInt(item || '0')
            return resolve(value);
        });
    });
}