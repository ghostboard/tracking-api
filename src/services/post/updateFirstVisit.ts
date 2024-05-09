import db from '../../sources/postgres';

export default async function (postId: string, firstVisit: Date) {
  return db('posts')
    .where('id', postId)
    .whereNull('firstVisit')
    .update({ firstVisit });
}
