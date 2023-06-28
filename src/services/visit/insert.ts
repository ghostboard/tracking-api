import * as crypto from "crypto";
import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (newView: object) {
	const sqlView:any = {...newView};
	sqlView.id = crypto.randomBytes(16).toString("hex")
	delete sqlView.noscript;
	db('visits').insert(sqlView)
		.then().catch((e) => console.log('> insertView', e))
	
	return mongoDb.Visit.create(newView);
}