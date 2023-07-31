import db from "../../sources/postgres"

export default async function (blogId: string, ownerId: string) {
    const update = {
        enableClient: false,
        removedAt: new Date()
    }
		return db('blogs').where({
			id: blogId,
			user: ownerId
		}).update({...update});
}