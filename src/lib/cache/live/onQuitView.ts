import { client as cache } from '../../../sources/redis'
import getView from './getView'
import getCountTotalViews from './getCountTotalViews'

export default async function onQuitView(viewId: string) {
    try {
        const view:any = await getView(viewId)
        if (!view) {
            return false
        }
        const { url, country, referer, mobile } = view
        const blogId = view.blog;
        const transactions: any[] = [];
        if (blogId) {
            const totalViews = await getCountTotalViews(blogId)
            if (totalViews > 0) {
                transactions.push(["decr", `live:blog:${blogId}:count:total`])
            } else if (totalViews < 0) {
                transactions.push(["incr", `live:blog:${blogId}:count:total`, totalViews*-1])
            }
            if (mobile) {
                transactions.push(["decr", `live:blog:${blogId}:count:mobile`])
            }
            if (url) {
                transactions.push(["zincrby", `live:blog:${blogId}:urls`, -1, url])
            }
            if (country) {
                transactions.push(["zincrby", `live:blog:${blogId}:countries`, -1, country])
            }
            if (referer) {
                transactions.push(["zincrby", `live:blog:${blogId}:referers`, -1, referer])
            }
            transactions.push(["del", `live:view:${viewId}`])
            transactions.push(["del", `live:view:copy:${viewId}`])
            transactions.push(["del", `view:${viewId}`])
            cache.multi(transactions).exec()
            return true
        }
        
        return false
    } catch (e) {
        console.error('>> redis error onQuitView', e);
        return false;
    }
}