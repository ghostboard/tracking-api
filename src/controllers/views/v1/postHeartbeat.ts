import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import heartbeat from '../../../logic/view/hearbeat';

export const method = 'POST';
export const url = '/v1/views/:id/heartbeat1';
export async function handler(
  req: FastifyRequest,
  res: FastifyReply
): Promise<FastifyReply> {
  let body = req.body as any;
  const params = req.params as any;

  const isBeacon = typeof body === 'string';
  if (isBeacon) {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return res.code(401).send(0);
    }
  }

  let visitID: string = '';
  if (params.id) {
    visitID = params.id;
  } else if (body.C) {
    visitID = body.C;
  }

  const time = parseInt(body.A, 10);
  const event = body.B;
  const useragent = req.headers['user-agent'] || '';
  const out = await heartbeat(visitID, time, event, useragent);
  const hasResponse = out && out.code;
  if (hasResponse) {
    return res.code(out.code).send(out.message || false);
  }
  return res.code(200).send(1);
}

export default function (fastify: FastifyInstance) {
  fastify.route({
    method,
    url,
    handler,
  });
}
