import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import trackNoscript from '../../../core/views/trackNoscript';

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/noscript/:id/pixel.gif',
    handler: async function (
      req: FastifyRequest,
      res: FastifyReply
    ): Promise<number> {
      const params: { [index: string]: any } = req.params as object;
      const blogId = params?.id;
      const path = req.headers['referer'];
      const useragent = req.headers['user-agent'];
      const lang = req.headers['accept-language'];
      const userIp = req.ip;
      await trackNoscript(blogId, path, useragent, lang, userIp);
      return res.code(200).send();
    },
  });
}
