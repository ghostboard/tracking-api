const cache = require('../../../../../lib/cache');

async function getTotalViews(blogId) {
    const key = `live:blog:${blogId}:count:total`;

    return new Promise((resolve, reject) => {
        cache.incr(key, function (e, data) {
            if (e) {
                return reject(e);
            }
            return resolve(data);
        });
    });
}

module.exports = getTotalViews;