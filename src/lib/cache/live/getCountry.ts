import { client as cache } from '../../../sources/redis'

export default async function getCountry(blogId: string, country: string) :Promise<number>{
    const key = `live:blog:${blogId}:countries`;
    
    if (!blogId || !country) {
        return 0
    }

    return new Promise((resolve, reject) => {
        cache.zscore(key, country, (err, item) => {
            if (err) {
                return reject(err);
            }
            const value = parseInt(item || '0')
            return resolve(value);
        });
    });
}