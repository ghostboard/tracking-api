import db from "../../sources/postgres"

export default async function (blogId: string, location: string, error: string, useragent: string, referer: string) {
	const newDebug = {
		blog: blogId,
		location,
		error,
		url: referer,
		useragent,
		created: new Date()
	};
	return db('tracker_debug').insert(newDebug);
}