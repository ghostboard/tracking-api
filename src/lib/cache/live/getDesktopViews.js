const cache = require('../../../../../lib/cache');

async function getDesktopViews(blogId) {
    const key = `live:blog:${blogId}:count:desktop`;

    return new Promise((resolve, reject) => {
        cache.get(key, function (e, data) {
            if (e) {
                return reject(e);
            }
            return resolve(data);
        });
    });
}

module.exports = getDesktopViews;