import { FastifyReply } from 'fastify';

const buffer = Buffer.alloc(43);
const transparentGif =
  'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
buffer.write(transparentGif, 'base64');

export default function (reply: FastifyReply): FastifyReply {
  return reply.code(200).type('image/gif').send(buffer);
}
