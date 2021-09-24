import markForClean from '../../services/blog/markForClean'

export default async function(blogId: string): Promise<any> {
    return markForClean(blogId)
}