import getView from './getView'
import setView from './setView'
import incCountry from './incCountry'
import incReferer from './incReferer'
import incUrl from './incUrl'
import incMobileViews from './incMobileViews'
import incDesktopViews from './incDesktopViews'
import incTotalViews from './incTotalViews'

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
        await setView(view);
        const todo = [
            incTotalViews(blogId)
        ];
        if (mobile) {
            todo.push(incMobileViews(blogId));
        } else {
            todo.push(incDesktopViews(blogId));
        }
        if (url) {
            todo.push(incUrl(blogId, url));
        }
        if (country) {
            todo.push(incCountry(blogId, country));
        }
        if (referer) {
            todo.push(incReferer(blogId, referer));
        }
        await Promise.all(todo);
        return true;
    } catch (e) {
        console.error('>> redis error onReAddView', e);
        return false;
    }
}