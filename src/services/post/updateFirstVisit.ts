// import mongoose from 'mongoose'
// import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (postId: string, firstVisit: Date) {
	return db('posts').where('id', postId).whereNull('firstVisit')
		.update({ firstVisit });

	// try {
	// 	const isValidForMongo = mongoose.Types.ObjectId.isValid(postId);
	// 	if (isValidForMongo) {
	// 		mongoDb.Post.updateOne({ _id: postId }, { firstVisit }).exec();
	// 	}
	// } catch (e){
	// 	console.error('updateFirstVisit', postId, firstVisit, e);
	// }
	// return true;
}