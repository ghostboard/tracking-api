import getView from './getView'
import decCountry from './decCountry'
import decReferer from './decReferer'
import decUrl from './decUrl'
import decMobileViews from './decMobileViews'
import decDesktopViews from './decDesktopViews'
import decTotalViews from './decTotalViews'

export default async function onQuitView(viewId: string) {
    console.log('>> redis onQuitView input', viewId)
    try {
        const redisData = await getView(viewId)
        console.log('>> redis onQuitView redisData', redisData)
        let view = JSON.parse(redisData)
        if (typeof view === 'string') {
            view = JSON.parse(view)
        }
        const { url, country, referer, mobile } = view
        const blogId = view.blog;
        console.log('>> redis onQuitView after getView', view)
        const todo = [
            decTotalViews(blogId)
        ];
        if (mobile) {
            todo.push(decMobileViews(blogId));
        } else {
            todo.push(decDesktopViews(blogId));
        }
        if (url) {
            todo.push(decUrl(blogId, url));
        }
        if (country) {
            todo.push(decCountry(blogId, country));
        }
        if (referer) {
            todo.push(decReferer(blogId, referer));
        }
        await Promise.all(todo);
        return true;
    } catch (e) {
        console.log('>> redis error onQuitView', e);
        return false;
    }
}