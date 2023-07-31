import db from "../../sources/postgres"

export default async function (blogId: string, update: object) {
		return db('blogs').where('id', blogId).update({...update});
}