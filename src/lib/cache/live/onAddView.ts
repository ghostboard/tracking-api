import existsView from './existsView'
import setView from './setView'
import { client as cache } from '../../../sources/redis'

export default async function onAddView(view: any) {
    const { 
        blog: blogId, 
        visit: viewId,
        url, mobile, country, referer
    } = view as any;
    try {
        // const exists = await existsView(viewId);
        // if (exists) {
        //     return false;
        // }
        // view.isShown = true;
        // setView(view).then()

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
        
        // const transactions: any[] = [];
        // if (blogId) {
        //     transactions.push(["incr", `live:blog:${blogId}:count:total`])
        //     if (mobile) {
        //         transactions.push(["incr", `live:blog:${blogId}:count:mobile`])
        //     }
        //     if (url) {
        //         transactions.push(["zincrby", `live:blog:${blogId}:urls`, 1, url])
        //     }
        //     if (country) {
        //         transactions.push(["zincrby", `live:blog:${blogId}:countries`, 1, country])
        //     }
        //     if (referer) {
        //         transactions.push(["zincrby", `live:blog:${blogId}:referers`, 1, referer])
        //     }
        //     cache.multi(transactions).exec()
        //     return true
        // }
        
        // return false
    } catch (e) {
        console.error('>> redis error onAddView', e);
        return false;
    }
}