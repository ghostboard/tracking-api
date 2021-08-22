import getView from './getView'
import setView from './setView'
import { client as cache } from '../../../sources/redis'

export default async function onReAddView(viewId: string) {
    try {
        const view = await getView(viewId)
        if (!view) {
            return false
        }
        const { url, country, referer, mobile, isShown = false } = view
        if (isShown) {
            return false
        }
        const blogId = view.blog;
        view.isShown = true;
        setView(view).then()
        const transactions: any[] = [];
        if (blogId) {
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
            cache.multi(transactions).exec()
            return true
        }
        return false
    } catch (e) {
        console.error('>> redis error onReAddView', e);
        return false;
    }
}