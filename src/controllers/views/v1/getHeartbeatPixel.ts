import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import heartbeat from "../../../logic/view/hearbeat"

export const method = 'GET'
export const url = '/views/:viewId/heartbeat.gif'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<number> {
    const urlParams = (req.params as any)
    const queryParams = (req.query as any)
    const { viewId } = urlParams
    let time = queryParams.t ? parseInt(queryParams.t) : 0
    let event = queryParams.e
    const useragent = req.headers["user-agent"] || ''
    const out = await heartbeat(viewId, time, event, useragent)
    return res.code(200).send()
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}