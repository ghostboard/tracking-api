import existsView from './existsView'
import setView from './setView'
import incCountry from './incCountry'
import incReferer from './incReferer'
import incUrl from './incUrl'
import incMobileViews from './incMobileViews'
import incTotalViews from './incTotalViews'
import { client as cache } from '../../../sources/redis'

export default async function onAddView(view: any) {
    const { 
        blog: blogId, 
        visit: viewId,
        url, mobile, country, referer
    } = view as any;
    try {
        const exists = await existsView(viewId);
        if (exists) {
            return false;
        }
        view.isShown = true;
        setView(view).then();

        const transactions: any[] = [];
        if (blogId) {
            transactions.push(["incr", `live:blog:${blogId}:count:total`]);
        }
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
            console.log('onAdd transactions redis multi callback', err);
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
        console.error('>> redis error onAddView', e);
        return false;
    }
}