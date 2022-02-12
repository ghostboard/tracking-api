import getSlug from './getSlug'

describe("getSlug", () => {
	test('is available', () => {
		expect(typeof getSlug).toEqual('function');
	});

	test('return slug when google cache', () => {
		const blog = {
			domain: 'davidburgos.blog',
			url: 'https://davidburgos.blog/'
		};
		const slug = '/como-utilizar-y-diferenciar-el-rowid-y-rownum-de-oracle';
		const path = `https://webcache.googleusercontent.com/search?q=cache:NcEeG40lVDwJ:https://davidburgos.blog${slug}+&cd=1&hl=es-419&ct=clnk&gl=mx&client=firefox-b`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('turn http visit into https blog', () => {
		const blog = {
			domain: 'davidburgos.blog',
			url: 'https://davidburgos.blog/'
		};
		const path = 'http://davidburgos.blog/';
		expect(getSlug(blog, path)).toEqual('/');
	});

	test('get slug from a different domain and url', () => {
		const blog = {
			domain: 'ofosos.org',
			url: 'https://markmark.ghost.io/'
		};
		const path = 'https://ofosos.org/';
		expect(getSlug(blog, path)).toEqual('/');
	});

	test('get slug with a default blog', () => {
		const blog = {
			domain: 'davidburgos.blog',
			url: 'https://davidburgos.blog/'
		};
		const slug = '/';
		const path = blog.url.substring(0, blog.url.length - 1) + slug;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get slug with a default blog post', () => {
		const blog = {
			domain: 'davidburgos.blog',
			url: 'https://davidburgos.blog/'
		};
		const slug = '/popular-posts';
		const path = blog.url.substring(0, blog.url.length - 1) + slug;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get slug with a subfolder blog', () => {
		const blog = {
			domain: 'ghostboard.io',
			url: 'https://ghostboard.io/blog/'
		};
		const slug = '/how-install-ghost-in-subfolder';
		const path = blog.url.substring(0, blog.url.length - 1) + slug;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get slug with a subfolder blog post', () => {
		const blog = {
			domain: 'ghostboard.io',
			url: 'https://ghostboard.io/blog/'
		};
		const slug = '/';
		const path = blog.url.substring(0, blog.url.length - 1) + slug;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get slug with a ghost.io blog', () => {
		const blog = {
			domain: 'insights.spruce.co',
			url: 'https://insights-spruce.ghost.io/'
		};
		const slug = '/';
		const path = blog.url.substring(0, blog.url.length - 1) + slug;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get slug with a ghost.io blog post', () => {
		const blog = {
			domain: 'insights.spruce.co',
			url: 'https://insights-spruce.ghost.io/'
		};
		const slug = '/spotlight-cindy-scholz-compass';
		const path = blog.url.substring(0, blog.url.length - 1) + slug;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get a slug clean of query params', () => {
		const blog = {
			domain: 'davidburgos.blog',
			url: 'https://davidburgos.blog/'
		};
		const path = `https://davidburgos.blog/about-me/?utm_content=buffer197fa&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer`;
		const slug = '/about-me';
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('get a slug keeping query params', () => {
		const blog = {
			domain: 'davidburgos.blog',
			url: 'https://davidburgos.blog/'
		};
		const slug = '/about-me?utm_content=buffer197fa&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer';
		const path = `https://davidburgos.blog/about-me/?utm_content=buffer197fa&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('get a slug from a compount slug', () => {
		const blog = {
			domain: 'merry.io',
			url: 'https://www.merry.io/'
		};
		const slug = '/27-the-eilenberg-zilber-theorem';
		const path = `https://www.merry.io/algebraic-topology/27-the-eilenberg-zilber-theorem/`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('should work when blog is not available', () => {
		const blog = {};
		const slug = '/27-the-eilenberg-zilber-theorem';
		const path = `https://www.merry.io/algebraic-topology/27-the-eilenberg-zilber-theorem/`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('issue detected with query removing', () => {
		const blog = {
			domain: 'blog.automox.com',
			url: 'https://blog.automox.com/'
		};
		const slug = '/automox-script-move-disconnected-devices-to-group';
		const path = `https://blog.automox.com/automox-script-move-disconnected-devices-to-group`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('issue without query removing', () => {
		const blog = {
			domain: 'blog.automox.com',
			url: 'https://blog.automox.com/'
		};
		const slug = '/automox-script-move-disconnected-devices-to-group';
		const path = `https://blog.automox.com/automox-script-move-disconnected-devices-to-group`;
		expect(getSlug(blog, path, false)).toEqual(slug);
	});

	test('issue without subcategory & amp with last slash', () => {
		const blog = {
			domain: 'motorious.com',
			url: 'https://www.motorious.com/'
		};
		const slug = '/barn-find-hunter-uncovers-rare-1969-trans-am-400-in-alaksa';
		const path = `https://www.motorious.com/articles/news/barn-find-hunter-uncovers-rare-1969-trans-am-400-in-alaksa/amp/`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('issue without subcategory & amp without last slash', () => {
		const blog = {
			domain: 'motorious.com',
			url: 'https://www.motorious.com/'
		};
		const slug = '/barn-find-hunter-uncovers-rare-1969-trans-am-400-in-alaksa';
		const path = `https://www.motorious.com/articles/news/barn-find-hunter-uncovers-rare-1969-trans-am-400-in-alaksa/amp`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('issue without subcategory & amp with query', () => {
		const blog = {
			domain: 'motorious.com',
			url: 'https://www.motorious.com/'
		};
		const slug = '/barn-find-hunter-uncovers-rare-1969-trans-am-400-in-alaksa';
		const path = `https://www.motorious.com/articles/news/barn-find-hunter-uncovers-rare-1969-trans-am-400-in-alaksa/amp?utm_content=buffer197fa&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('issue without subcategory & amp with another post slug', () => {
		const blog = {
			domain: 'motorious.com',
			url: 'https://www.motorious.com/'
		};
		const slug = '/vapor-1965-ford-mustang';
		const path = `https://www.motorious.com/articles/handpicked/vapor-1965-ford-mustang/amp/65vapor@gmail.com/`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('get slug with a fullpath slug without query', () => {
		const blog = {
			domain: 'ghostboard.io',
			url: 'https://ghostboard.io/blog/'
		};
		const slug = '/about-me';
		const path = `https://ghostboard.io/blog/about-me/?test=1`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('get slug with a fullpath slug without query with amp', () => {
		const blog = {
			domain: 'ghostboard.io',
			url: 'https://ghostboard.io/blog/'
		};
		const slug = '/about-me';
		const path = `https://ghostboard.io/blog/about-me/amp/?test=1`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('issue getting empty slug', () => {
		const blog = {
			domain: 'motorious.com',
			url: 'https://www.motorious.com'
		};
		const slug = '/tim-allens-car-collection';
		const path = `https://www.motorious.com/articles/features-3/tim-allens-car-collection/`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('issue getting slug and its part of blog url', () => {
		const blog = {
			domain: 'manmatters.com',
			url: 'http://manmatters.com/blog/'
		};
		const slug = '/';
		const path = `https://manmatters.com/blog/`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('issue getting wrong slug with path without last slash', () => {
		const blog = {
			domain: 'gojek.io',
			url: 'https://www.gojek.io/blog/'
		};
		const slug = '/using-transition-blueprints-to-bridge-design-and-engineering-gaps';
		const path = `https://www.gojek.io/blog/using-transition-blueprints-to-bridge-design-and-engineering-gaps`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('issue getting wrong slug', () => {
		const blog = {
			domain: 'meesho.io',
			url: "https://meesho.io/",
		};
		const slug = '/meesho-adopts-boundaryless-workplace-model';
		const path = `https://meesho.io/blog/meesho-adopts-boundaryless-workplace-model`;
		expect(getSlug(blog, path)).toEqual(slug);
	});

	test('issue getting wrong slug with www with query', () => {
		const blog = {
			domain: 'meesho.io',
			url: "https://meesho.io/",
		};
		const slug = '/senior-finance-executive---farmiso-logistics-ap?id=16312c3d-555a-4171-89bd-c937f827483f';
		const path = `https://www.meesho.io/jobs/senior-finance-executive---farmiso-logistics-ap?id=16312c3d-555a-4171-89bd-c937f827483f`;
		expect(getSlug(blog, path, false)).toEqual(slug);
	});

	test('issue getting wrong slug with www removing query', () => {
		const blog = {
			domain: 'meesho.io',
			url: "https://meesho.io/",
		};
		const slug = '/senior-finance-executive---farmiso-logistics-ap';
		const path = `https://www.meesho.io/jobs/senior-finance-executive---farmiso-logistics-ap?id=16312c3d-555a-4171-89bd-c937f827483f`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});

	test('issue getting wrong slug with www with query and AMP', () => {
		const blog = {
			domain: 'meesho.io',
			url: "https://meesho.io/",
		};
		const slug = '/senior-finance-executive---farmiso-logistics-ap';
		const path = `https://www.meesho.io/jobs/senior-finance-executive---farmiso-logistics-ap/amp?id=16312c3d-555a-4171-89bd-c937f827483f`;
		expect(getSlug(blog, path, true)).toEqual(slug);
	});
})