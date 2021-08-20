import getView from './getView'
import setView from './setView'
import incCountry from './incCountry'
import incReferer from './incReferer'
import incUrl from './incUrl'
import incMobileViews from './incMobileViews'
import incTotalViews from './incTotalViews'
import { client as cache } from '../../../sources/redis'

export default async function onReAddView(viewId: string) {
    try {
        const redisData = await getView(viewId)
        if (!redisData) {
            return false
        }
        let view = JSON.parse(redisData)
        if (typeof view === 'string') {
            view = JSON.parse(view)
        }
        const { url, country, referer, mobile, isShown = false } = view
        if (isShown) {
            return false
        }
        const blogId = view.blog;
        view.isShown = true;
        setView(view).then()
        const transactions: any[] = [
            ["incr", `live:blog:${blogId}:count:total`]
        ];
        if (mobile) {
            transactions.push(["incr", `live:blog:${blogId}:count:mobile`]);
        }
        if (url) {
            transactions.push(["zincrby", `live:blog:${blogId}:urls`, 1, url]);
        }
        if (country) {
            transactions.push(["zincrby", `live:blog:${blogId}:countries`, 1, country]);
        }
        if (referer) {
            transactions.push(["zincrby", `live:blog:${blogId}:referers`, 1, referer]);
        }
        cache.multi(transactions).exec(function (err, replies) {
            console.log('transactions redis multi callback', err);
            console.log(replies);
        });
        // const todo: any[] = [];
        // if (blogId) {
        //     todo.push(incTotalViews(blogId));
        // }
        // if (mobile) {
        //     todo.push(incMobileViews(blogId));
        // }
        // if (url) {
        //     todo.push(incUrl(blogId, url));
        // }
        // if (country) {
        //     todo.push(incCountry(blogId, country));
        // }
        // if (referer) {
        //     todo.push(incReferer(blogId, referer));
        // }
        // await Promise.all(todo);
        return true;
    } catch (e) {
        console.error('>> redis error onReAddView', e);
        return false;
    }
}