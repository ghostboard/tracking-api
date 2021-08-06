import { FastifyReply } from "fastify"

export default function(reply: FastifyReply) {
    const buf = Buffer.alloc(43)
    const transparentGif = "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    buf.write(transparentGif, "base64")

    return reply.code(200).type('image/gif').send(buf)
}