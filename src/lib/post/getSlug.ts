export default function(blog: any, path: string, removeQuery:boolean=false, simpleSlug:boolean=false): string {
    if (!path) {
        return '';
    }
		const isSlug = path.startsWith('/') && !path.includes('http') && !path.includes('://');
		if (isSlug) {
			return path;
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
    let slug = path.substring(slugStart);
		const isAuthor = slug.includes('/author/');
		const isTag = slug.includes('/tag/');
		const isPreview = slug.includes('/p/');
		const skip = isAuthor || isTag || isPreview;
		if (skip ||simpleSlug) {
			if (removeQuery) {
				return slug.split('?')[0];
			}
			return slug;
		}

		const partials = slug.split('/').sort((a, b) => b.length - a.length);
    if (removeQuery) {
	    const selected: any = partials.find((item) => !item.startsWith('?') && !item.startsWith('amp?'));
	    slug = '/'+ selected.split('?')[0];
			const isGoogleCache = path.includes('.googleusercontent.com');
			if (isGoogleCache) {
				slug = slug.substring(0, slug.indexOf('+'));
			}
    } else {
	    const selected: any = partials.find((item) => !item.startsWith('?'));
			const hasAlreadyQuery = selected.includes('?');
	    slug = '/'+ selected;
			if (!hasAlreadyQuery) {
				const queries = path.split('?');
				if (queries.length > 1) {
					slug += '?' + queries[1];
				}
			}

    }

    return slug;
}