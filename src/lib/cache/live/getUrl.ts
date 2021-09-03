import { client as cache } from '../../../sources/redis'

export default async function getUrl(blogId: string, url: string) :Promise<number>{
    const key = `live:blog:${blogId}:urls`;
    
    if (!blogId || !url) {
        return 0
    }

    return new Promise((resolve, reject) => {
        cache.zscore(key, url, (err, item) => {
            if (err) {
                return reject(err);
            }
            const value = parseInt(item || '0')
            return resolve(value);
        });
    });
}