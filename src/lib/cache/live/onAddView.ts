import existsView from './existsView'
import setView from './setView'
import incCountry from './incCountry'
import incReferer from './incReferer'
import incUrl from './incUrl'
import incMobileViews from './incMobileViews'
import incDesktopViews from './incDesktopViews'
import incTotalViews from './incTotalViews'

export default async function onAddView(view: any) {
    const { 
        blog: blogId, 
        visit: viewId,
        url, mobile, desktop, country, referer
    } = view as any;
    try {
        const exists = await existsView(viewId);
        if (exists) {
            return false;
        }
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
        console.error('>> redis error onAddView', e);
        return false;
    }
}