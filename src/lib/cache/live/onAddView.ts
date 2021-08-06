const existsView = require('./existsView');
const setView = require('./setView');
const incCountry = require('./incCountry');
const incReferer = require('./incReferer');
const incUrl = require('./incUrl');
const incMobileViews = require('./incMobileViews');
const incDesktopViews = require('./incDesktopViews');
const incTotalViews = require('./incTotalViews');

export default async function onAddView(view: string) {
    const { 
        blog: blogId, 
        visit: viewId,
        url, mobile, desktop, country, referer
    } = view as any;
    console.log('>> redis onAddView input', view);
    try {
        const exists = await existsView(viewId);
        console.log('>> redis onAddView exists?', exists);
        if (exists) {
            return false;
        }
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
        console.log('>> redis error onAddView', e);
        return false;
    }
}