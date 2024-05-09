import { client as cache } from '../../../sources/redis';

export default async function onReAddView(blogId: string, viewId: string) {
  try {
    cache.zadd(
      `live:blog:${blogId}:queue:add`,
      'NX',
      new Date().getTime(),
      viewId,
      (e, reply) => {
        const ready = !e && reply;
        if (ready) {
          cache.publish('live:queue:add', blogId);
        }
        return ready;
      }
    );
  } catch (e) {
    console.error('>> redis error onReAddView', e);
    return false;
  }
}
