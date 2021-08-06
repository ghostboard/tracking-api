export default function(blog: any, path: string, removeQuery:boolean=false): string {
    if (!path) {
        return '';
    }
    if (blog.url) {
        const blogHasHttps = blog.url.startsWith('https');
        const pathHasHttps = path.startsWith('https');
        const addHttpsToPath = path.includes(blog.url.replace('https', 'http'));
        const addHttpsToBlog = !blogHasHttps && pathHasHttps;
        if (addHttpsToPath) {
            path = path.replace('http', 'https');
        } else if (addHttpsToBlog) {
            blog.url = blog.url.replace('http', 'https')
        }
    }
    const useUrl = path.includes(blog.url);
    let rootPath = useUrl ? blog.url : blog.domain;

    if (!rootPath) {
        rootPath = path.substring(0, path.indexOf('/', path.indexOf('://') + 3));
    }

    const blogEndsSlash = rootPath.endsWith('/');
    if (blogEndsSlash) {
        rootPath = rootPath.substring(0, rootPath.length - 1);
    }

    const domainIndex = path.indexOf(rootPath);
    const slugStart = domainIndex + rootPath.length;
    let lastSlash = path.length;
    if (removeQuery) {
        const lastSlashIndex = path.substring(slugStart + 1).lastIndexOf('/');
        if (lastSlashIndex >= 0) {
            lastSlash = path.substring(slugStart + 1).lastIndexOf('/') + 2 + slugStart;
        }
    }
    const slug = path.substring(slugStart, lastSlash);
    let selected = slug;
    if (removeQuery) {
        const partials = slug.split('/').sort((a, b) => b.length - a.length);
        selected = partials.find((item) => {
            return !item.includes('?');
        }) || slug;
        const ampIndex = selected.lastIndexOf('/amp');
        const hasAmp = ampIndex && ampIndex > 2;
        if (hasAmp) {
            selected = selected.substring(0, selected.indexOf('/amp') + 1);
        }
        return '/' + selected + '/';
    }

    return slug;
}