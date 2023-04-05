import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (newView) {
	db('visits').insert(newView)
		.then().catch((e) => console.log('> insertView', e))
	
	return mongoDb.Visit.create(newView);
}