import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (userId: string, firstVisit: Date) {
	db('users').where('id', userId).update({ firstVisit })
		.then().catch((e) => console.log('> updateFirstVisit', e))

	return mongoDb.User.updateOne({ _id: userId }, { firstVisit }).exec();
}