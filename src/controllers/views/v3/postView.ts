import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import trackView from '../../../core/views/trackView';

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/v3/views/:blogId',
    handler: async function (
      req: FastifyRequest,
      res: FastifyReply
    ): Promise<any> {
      const params = req.params as any;
      const body = req.body as any;
      const { blogId } = params;
      const useragent = req.headers['user-agent'] || '';
      const requestReferer = req.headers['referer'] || '';
      const lang = body.C;
      const viewReferer = body.D;
      const path = body.U;
      const userIp = req.ip;
      try {
        const output = await trackView(
          blogId,
          path,
          requestReferer,
          viewReferer,
          lang,
          useragent,
          userIp,
          body
        );
        return res.code(200).send(output);
      } catch (error: any) {
        const { statusCode = 500, message } = error;
        const output = message || '';
        return res.code(statusCode).send(output);
      }
    },
  });
}
