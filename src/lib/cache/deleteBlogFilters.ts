import { client as cache } from '../../db/cache'

async function deleteBlogFilters(blogId: string) {
    const key = `blog:${blogId}:ip_filters`;
    
    return new Promise((resolve, reject) => {
        cache.del(key, (err, out) => {
            if (err) {
                return reject(err);
            }
            resolve(out);
        });
    });
}

module.exports = deleteBlogFilters;