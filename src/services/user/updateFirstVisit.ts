import db from '../../sources/postgres';

export default async function (userId: string, firstVisit: Date) {
  return db('users').where('id', userId).update({ firstVisit });
}
