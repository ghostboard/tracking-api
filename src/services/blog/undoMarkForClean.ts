// import mongoose from "mongoose"
// import mongoDb from '../../models'
import db from "../../sources/postgres"

export default async function (blogId: string, ownerId: string) {
    // const query = {
    //     _id: blogId,
    //     user: ownerId
    // }
    const update = {
        enableClient: true,
        removedAt: null
    }
		return db('blogs').where({
			id: blogId,
			user: ownerId
		}).update({...update});//.then().catch((e) => console.log('> undoMarkForClean', e))
		// const isValidId = mongoose.Types.ObjectId.isValid(blogId)
		// if (!isValidId) {
		// 	return { done: false, message: 'Invalid blogId' }
		// }
    // return mongoDb.Blog.updateOne(query, update);
}