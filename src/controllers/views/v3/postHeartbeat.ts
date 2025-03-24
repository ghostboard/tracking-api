import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import trackHeartbeat from '../../../core/views/trackHeartbeat';

export default function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/v3/views/:id/heartbeat',
    handler: async function (
      req: FastifyRequest,
      res: FastifyReply
    ): Promise<number> {
      let body = req.body as any;
      const params = req.params as any;
      const isBeacon = typeof body === 'string';
      if (isBeacon) {
        try {
          body = JSON.parse(body);
        } catch (err) {
          return res.code(401).send();
        }
      }

      let visitID: string = '';
      if (params.id) {
        visitID = params.id;
      } else if (body.C) {
        visitID = body.C;
      }

      const time = parseInt(body.A, 10) || 0;
      const event = body.B;
      const useragent = req.headers['user-agent'];
      trackHeartbeat(visitID, time, event, useragent, undefined).then().catch();
      return res.code(200).send();
    },
  });
}
