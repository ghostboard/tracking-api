import setView from './setView'
import { client as cache } from '../../../sources/redis'

export default async function onAddView(view: any) {
    const { 
        blog: blogId, 
        visit: viewId,
        mobile,
        url,
        country,
        referer
    } = view as any;
    try {
        const done = await setView(view)
        if (done) {
            const transactions: any[] = [];
            transactions.push(["incr", `live:blog:${blogId}:count:total`])
            if (mobile) {
                transactions.push(["incr", `live:blog:${blogId}:count:mobile`])
            }
            if (url) {
                transactions.push(["zincrby", `live:blog:${blogId}:urls`, 1, url])
            }
            if (country) {
                transactions.push(["zincrby", `live:blog:${blogId}:countries`, 1, country])
            }
            if (referer) {
                transactions.push(["zincrby", `live:blog:${blogId}:referers`, 1, referer])
            }
            transactions.push(["zrem", `live:blog:${blogId}:queue:add`, viewId])
            const done = cache.multi(transactions).exec()
            return done
        }
    } catch (e) {
        console.error('>> redis error onAddView', e);
        return false;
    }
}