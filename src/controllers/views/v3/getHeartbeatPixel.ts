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
      const time = queryParams.t ? parseInt(queryParams.t) : 0;
      const event = queryParams.e;
			const scrollPercent = queryParams.sp ? parseInt(queryParams.sp) : undefined;
      const useragent = req.headers['user-agent'] || '';
      trackHeartbeat(viewId, time, event, useragent, scrollPercent).then().catch();
      return res.code(200).send();
    },
  });
}
