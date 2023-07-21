import mongoose from 'mongoose'
// import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (userId: string, firstVisit: Date) {
	db('users').where('id', userId).update({ firstVisit })
		.then().catch((e) => console.log('> updateFirstVisit', e))

	// try {
	// 	const isValidForMongo = mongoose.Types.ObjectId.isValid(userId);
	// 	if (isValidForMongo) {
	// 		mongoDb.User.updateOne({ _id: userId }, { firstVisit }).exec();
	// 	}
	// } catch (e){
	// 	console.error('user updateFirstVisit', userId, firstVisit, e);
	// }
	return true;
}