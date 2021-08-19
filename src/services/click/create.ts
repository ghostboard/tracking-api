import mongoose from "mongoose"
import db from '../../models'

export default async function (blogId: string, origin: string, target: string, title: string, text: string, image: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(blogId)
    if (!isValidId) {
        return { done: false, message: 'Invalid blogId' }
    }
    const newClick: any = {
        blog: blogId,
        origin,
        target,
        created: new Date()
    };
    if (title) {
        newClick.title = title;
    }
    if (text) {
        newClick.text = text;
    } else if (image) {
        newClick.image = image;
    }
    return db.Click.create(newClick);
}