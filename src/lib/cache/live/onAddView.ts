import setView from './setView'
import { client as cache } from '../../../sources/redis'

export default async function onAddView(view: any) {
    const { 
        blog: blogId, 
        visit: viewId
    } = view as any;
    try {
        const done = await setView(view)
        if (done) {
            cache.zadd(`live:blog:${blogId}:queue:add`, 'NX', new Date().getTime(), viewId, (e, reply) => {
                const ready = !e && reply
                if (ready) {
                    cache.publish('live:queue:add', blogId)
                }
                return ready
            })
        }
    } catch (e) {
        console.error('>> redis error onAddView', e);
        return false;
    }
}