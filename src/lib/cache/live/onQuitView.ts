import { client as cache } from '../../../sources/redis'

export default async function onQuitView(blogId: string, viewId: string) {
    try {
        cache.zadd(`live:blog:${blogId}:queue:quit`, 'NX', new Date().getTime(), viewId, (e, reply) => {
            const ready = !e && reply
            if (ready) {
                cache.publish('live:queue:quit', blogId)
            }
            return ready
        })
    } catch (e) {
        console.error('>> redis error onQuitView', e);
        return false;
    }
}