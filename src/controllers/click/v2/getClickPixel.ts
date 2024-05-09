import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import trackClick from '../../../core/clicks/trackClick';

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/v2/blogs/:blogId/clicks',
    handler: async function (
      req: FastifyRequest,
      res: FastifyReply
    ): Promise<number> {
      const urlParams = req.params as any;
      const queryParams = req.query as any;
      const { blogId } = urlParams;
      const { l: target, t: title, a: text, i: image } = queryParams;
      const origin = req.headers['referer'] || '';
      const useragent = req.headers['user-agent'] || '';
      const ip = req.ip;
      const isValid =
        blogId &&
        origin &&
        target &&
        (title || text || image) &&
        useragent &&
        ip;
      if (isValid) {
        const output = await trackClick(
          blogId,
          origin,
          target,
          title,
          text,
          image,
          useragent,
          ip
        );
      }
      return res.code(200).send();
    },
  });
}
