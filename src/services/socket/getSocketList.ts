import { client as cache } from '../../sources/redis'

export default async function getSocketList(namespace: String, blogId: String) :Promise<string[]> {
    return new Promise((resolve, reject) => {
        const key = `sockets:blog:${blogId}:namespace:${namespace}`
        cache.get(key, (err, list) => {
            if (err) {
                return reject(err);
            }
            if (list) {
                return resolve(JSON.parse(list));
            }
            return resolve([])
        })
    })
}