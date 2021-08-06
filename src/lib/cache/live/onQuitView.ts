const getView = require('./getView');
const deleteView = require('./deleteView');
const decCountry = require('./decCountry');
const decReferer = require('./decReferer');
const decUrl = require('./decUrl');
const decMobileViews = require('./decMobileViews');
const decDesktopViews = require('./decDesktopViews');
const decTotalViews = require('./decTotalViews');

export default async function onQuitView(viewId: string) {
    console.log('>> redis onQuitView input', viewId);
    try {
        const redisData = await getView(viewId);
        console.log('>> redis onQuitView redisData', redisData);
        const view = JSON.parse(redisData);
        const { url, country, referer, mobile } = view;
        const blogId = view.blog;
        console.log('>> redis onQuitView after getView', view);
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
        await deleteView(view);
        return true;
    } catch (e) {
        console.log('>> redis error onQuitView', e);
        return false;
    }
}