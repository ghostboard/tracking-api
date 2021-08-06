const cache = require('../../../../../lib/cache');

async function getTopReferers(blogId, limit = 10) {
    const key = `live:blog:${blogId}:referers`;

    return new Promise((resolve, reject) => {
        cache.zrevrange(key, 0, limit-1, function (e, reply) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}

module.exports = getTopReferers;