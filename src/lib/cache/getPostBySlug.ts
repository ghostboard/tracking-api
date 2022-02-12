import db from '../../models'
import { client as cache } from '../../sources/redis'
import escapeStringRegexp from '../util/escapeStringRegexp'

export default async function getPostBySlug(blogId: string, slug: string) :Promise<any>{
    const key = `blog:${blogId}:post_by_slug:${slug}`;
    const expiration = 120 * 60;
    const notFoundExpiration = 5*60;
    return new Promise((resolve, reject) => {
        cache.get(key, async(err, item) => {
            if (err) {
                return reject(err);
            }
            if (item) {
                return resolve(JSON.parse(item));
            }
						const post = await findPostBySlug(blogId, slug);
            const isValid = post && post._id && post.url && post.url.endsWith(slug);
            if (isValid) {
                cache.setex(key, expiration, JSON.stringify(post));
            } else {
                cache.setex(key, notFoundExpiration, '{}');
            }
            resolve(post);
        });
    });
}

export async function findPostBySlug(blogId: string, slug: string) {
	const select = '_id firstVisit url';
	const query = {
		blog: blogId,
		url: new RegExp(escapeStringRegexp(slug), "g")
	};
	console.log('query', query)
	return db.Post.findOne(query).select(select).lean();
}