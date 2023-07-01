import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (viewId: string, time: number) {
	const update: any = {
		time
	};
	try {
		const query = db('visits').where('id', viewId).update(update);
		await query;
	} catch (e) {
		console.log('> sql updateTime error', viewId, time)
		console.log('> sql updateTime', e)
	}

	const query = {
		_id: viewId
	};

	return mongoDb.Visit.updateOne(query, {...update}).exec();
}