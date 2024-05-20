import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import trackHeartbeat from '../../../core/views/trackHeartbeat';

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/views/:viewId/heartbeat',
    handler: async function (
      req: FastifyRequest,
      res: FastifyReply
    ): Promise<number> {
      const urlParams = req.params as any;
      const queryParams = req.query as any;
      const { viewId } = urlParams;
      let time = queryParams.t ? parseInt(queryParams.t) : 0;
      let event = queryParams.e;
      const useragent = req.headers['user-agent'] || '';
      trackHeartbeat(viewId, time, event, useragent).then().catch();
      return res.code(200).send();
    },
  });
}
