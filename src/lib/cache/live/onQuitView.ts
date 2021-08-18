import getView from './getView'
import decCountry from './decCountry'
import decReferer from './decReferer'
import decUrl from './decUrl'
import decMobileViews from './decMobileViews'
import decDesktopViews from './decDesktopViews'
import decTotalViews from './decTotalViews'
import deleteView from './deleteView'

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
        await deleteView(viewId)
        return true;
    } catch (e) {
        console.log('>> redis error onQuitView', e);
        return false;
    }
}