const cache = require('../../../../../lib/cache');

async function getTopCountries(blogId, limit = 10) {
    const key = `live:blog:${blogId}:countries`;

    return new Promise((resolve, reject) => {
        cache.zrevrange(key, 0, limit-1, function (e, reply) {
            if (e) {
                return reject(e);
            }
            return resolve(reply);
        });
    });
}

module.exports = getTopCountries;