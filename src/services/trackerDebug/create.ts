import mongoose from "mongoose"
import db from '../../models'

export default async function (blogId: string, location: string, error: string, useragent: string, referer: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(blogId)
    if (!isValidId) {
        return { done: false, message: 'Invalid blogId' }
    }
    const newDebug = {
        blog: blogId,
        location,
        error,
        url: referer,
        useragent,
        created: new Date()
    };
    return db.TrackerDebug.create(newDebug);
}