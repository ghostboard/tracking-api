import undoMarkForClean from '../../services/blog/undoMarkForClean'

export default async function(blogId: string): Promise<boolean> {
    try {
        await undoMarkForClean(blogId)
        return true
    } catch (e) {
        console.error('undoDeleteBlog Error', e)
        return false
    }
}