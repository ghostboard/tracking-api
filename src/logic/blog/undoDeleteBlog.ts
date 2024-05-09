import undoMarkForClean from '../../services/blog/undoMarkForClean';

export default async function (
  blogId: string,
  ownerId: string
): Promise<boolean> {
  try {
    await undoMarkForClean(blogId, ownerId);
    return true;
  } catch (e) {
    console.error('undoDeleteBlog Error', e);
    return false;
  }
}
