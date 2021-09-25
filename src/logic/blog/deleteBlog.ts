import markForClean from '../../services/blog/markForClean'

export default async function(blogId: string, ownerId: string): Promise<any> {
    return markForClean(blogId, ownerId)
}