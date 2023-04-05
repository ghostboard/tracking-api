import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (viewId: string, time: number) {
	db('visits').where('id', viewId).update({ time })
		.then().catch((e) => console.log('> updateTime', e))

	const query = {
		_id: viewId
	};
	const update: any = {
		time
	};
	return mongoDb.Visit.updateOne(query, update).exec();
}