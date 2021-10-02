import { client as cache } from '../../../sources/redis'
import getView from './getView'

export default async function onQuitView(blogId: string, viewId: string) {
    try {
        const view: any = await getView(viewId)
        if (!view) {
            return { done: false }
        }
        const { url, country, referer, mobile } = view
        const blogId = view.blog;

        if (!blogId) {
            return { done: false }
        }
        const transactions: any[] = [];
        transactions.push(["decr", `live:blog:${blogId}:count:total`])
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
        transactions.push(["zrem", `live:blog:${blogId}:queue:add`, viewId])
        transactions.push(["zrem", `live:blog:${blogId}:queue:quit`, viewId])
        const done = cache.multi(transactions).exec()
        return done
    } catch (e) {
        console.error('>> redis error onQuitView', e);
        return false;
    }
}