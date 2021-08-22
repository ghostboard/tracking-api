import getView from './getView'
import decCountry from './decCountry'
import decReferer from './decReferer'
import decUrl from './decUrl'
import decMobileViews from './decMobileViews'
import decTotalViews from './decTotalViews'
import deleteView from './deleteView'
import { client as cache } from '../../../sources/redis'

export default async function onQuitView(viewId: string) {
    try {
        const redisData = await getView(viewId)
        if (!redisData) {
            return false
        }
        let view = JSON.parse(redisData)
        if (typeof view === 'string') {
            view = JSON.parse(view)
        }
        const { url, country, referer, mobile } = view
        const blogId = view.blog;
        const transactions: any[] = [];
        if (blogId) {
            transactions.push(["decr", `live:blog:${blogId}:count:total`]);
        }
        if (mobile) {
            transactions.push(["decr", `live:blog:${blogId}:count:mobile`]);
        }
        if (url) {
            transactions.push(["zincrby", `live:blog:${blogId}:urls`, -1, url]);
        }
        if (country) {
            transactions.push(["zincrby", `live:blog:${blogId}:countries`, -1, country]);
        }
        if (referer) {
            transactions.push(["zincrby", `live:blog:${blogId}:referers`, -1, referer]);
        }
        transactions.push(["del", `live:view:${viewId}`]);
        transactions.push(["del", `view:${viewId}`]);
        cache.multi(transactions).exec();
        // const todo: any[] = [];
        // if (blogId) {
        //     todo.push(decTotalViews(blogId));
        // }
        // if (mobile) {
        //     todo.push(decMobileViews(blogId));
        // }
        // if (url) {
        //     todo.push(decUrl(blogId, url));
        // }
        // if (country) {
        //     todo.push(decCountry(blogId, country));
        // }
        // if (referer) {
        //     todo.push(decReferer(blogId, referer));
        // }
        // await Promise.all(todo);
        // await deleteView(viewId)
        return true;
    } catch (e) {
        console.error('>> redis error onQuitView', e);
        return false;
    }
}