import mongoose from "mongoose"
import db from '../../models'

export default async function (blogId: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(blogId)
    if (!isValidId) {
        return { done: false, message: 'Invalid blogId' }
    }
    const query = {
        _id: blogId
    }
    const update = {
        enableClient: false,
        removedAt: new Date()
    }
    return db.Blog.updateOne(query, update);
}