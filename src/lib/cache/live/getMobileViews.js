const cache = require('../../../../../lib/cache');

async function getMobileViews(blogId) {
    const key = `live:blog:${blogId}:count:mobile`;

    return new Promise((resolve, reject) => {
        cache.incr(key, function (e, data) {
            if (e) {
                return reject(e);
            }
            return resolve(data);
        });
    });
}

module.exports = getMobileViews;