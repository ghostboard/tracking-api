import * as crypto from "crypto";
import db from "../../sources/postgres"

export default async function (newView: object) {
	const sqlView:any = {...newView};
	sqlView.id = crypto.randomBytes(16).toString("hex")
	delete sqlView.noscript;
	await db('visits').insert(sqlView);
	return sqlView;
}