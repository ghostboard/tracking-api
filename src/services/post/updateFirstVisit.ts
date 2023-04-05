import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (postId: string, firstVisit: Date) {
	db('posts').where('id', postId).whereNull('firstVisit')
		.update({ firstVisit })
		.then().catch((e) => console.log('> postUpdateFirstVisit', e))

	return mongoDb.Post.updateOne({ _id: postId }, { firstVisit }).exec();
}