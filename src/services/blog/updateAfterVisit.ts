// import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (blogId: string, update: object) {
		return db('blogs').where('id', blogId).update({...update});
			// .then().catch((e) => console.log('> updateAfterVisit', e))
		//
		// const query = {
		// 	_id: blogId
		// }
    // return mongoDb.Blog.updateOne(query, update);
}