import mongoose from "mongoose"
import db from '../../models'

export default async function (blogId: string, ownerId: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(blogId)
    if (!isValidId) {
        return { done: false, message: 'Invalid blogId' }
    }
    const query = {
        _id: blogId,
        user: ownerId
    }
    const update = {
        enableClient: true,
        removedAt: null
    }
    return db.Blog.updateOne(query, update);
}