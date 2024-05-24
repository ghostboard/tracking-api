import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import trackError from '../../../core/errors/trackError';

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/v2/blogs/:blogId/errors',
    handler: async function (
      req: FastifyRequest,
      res: FastifyReply
    ): Promise<number> {
      const urlParams = req.params as any;
      const queryParams = req.query as any;
      const { blogId } = urlParams;
      const { l: location, e: error } = queryParams;
      const useragent = req.headers['user-agent'];
      const referer = req.headers['referer'];
      const isValid = blogId && location && error && useragent && referer;
      if (isValid) {
        const output = await trackError(
          blogId,
          location,
          error,
          useragent,
          referer
        );
      }
      return res.code(200).send();
    },
  });
}
