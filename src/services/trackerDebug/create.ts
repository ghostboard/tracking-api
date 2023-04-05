import mongoose from "mongoose"
import mongoDb from '../../models'
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
	db('tracker_debug').insert(newDebug).then().catch((e) => console.log('> trackerDebug', e))
	const isValidId = mongoose.Types.ObjectId.isValid(blogId)
  if (!isValidId) {
      return { done: false, message: 'Invalid blogId' }
  }

  return mongoDb.TrackerDebug.create(newDebug);
}