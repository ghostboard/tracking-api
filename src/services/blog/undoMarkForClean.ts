import db from '../../sources/postgres';

export default async function (blogId: string, ownerId: string) {
  const update = {
    enableClient: true,
    removedAt: null,
  };
  return db('blogs')
    .where({
      id: blogId,
      user: ownerId,
    })
    .update({ ...update });
}
