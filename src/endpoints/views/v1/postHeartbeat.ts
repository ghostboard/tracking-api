import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import moment from "moment"
import mongoose from "mongoose"
import db from '../../../db/models'
import { socketio } from '../../../db/socket'
import FEATURES_FLAGS from '../../../config/features'
import onAddView from "../../../lib/cache/live/onAddView"
import onQuitView from "../../../lib/cache/live/onQuitView"
import isMobile from "../../../lib/views/isMobile"
import isTablet from "../../../lib/views/isTablet"

export const method = 'POST'
export const url = '/v1/views/:id/heartbeat'
export async function handler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    res.code(200).send(true)

    let body = (req.body as any)
    const params = (req.params as any)

    const isBeacon = typeof body === 'string';
    if (isBeacon) {
        try {
            body = JSON.parse(body);
        } catch (err) {
            return res.code(401).send(false)
        }
    }

    let visitID:string = '';
    if (params.id) {
        visitID = params.id;
    } else if (body.C) {
        visitID = body.C;
    }

    const proceed = visitID && body.A && mongoose.Types.ObjectId.isValid(visitID);
    if (!proceed) {
        return res.code(200).send(true)
    }
    const useragent = req.headers["user-agent"]
    const query = {
        _id: visitID
    };
    const now = moment();
    let time = parseInt(body.A, 10);
    const isNegativeTime = time < 0;
    if (isNegativeTime) {
        time *= -1;
    }
    const update: any = {
        time
    };
    let event: any = null;
    if (body.B) {
        event = body.B;
        const useragentIsMobile = isMobile(useragent);
        const useragentIsTablet = isTablet(useragent);
        const isDesktop = !useragentIsMobile && !useragentIsTablet;
        const exitEvents = ["beforeunload", "unload"];
        if (!isDesktop) {
            exitEvents.push('blur');
            exitEvents.push('focusout');
            exitEvents.push('pagehide');
            exitEvents.push('visibilityState:hidden');
        }

        const isOffline = exitEvents.indexOf(event) !== -1;
        if (isOffline) {
            db.Live.updateOne({ visit: visitID }, { exit: new Date() }).exec();
            onQuitView(visitID).then(console.log);
        }
        const isReading =
            [
                "focus",
                "focusin",
                "pageshow",
                "visibilityState:visible"
            ].indexOf(event) !== -1;
        if (isReading) {
            db.Live.updateOne({ visit: visitID }, { exit: null }).exec();
            onAddView(visitID).then(console.log);
        }
    }
    const visit = await db.Visit.findById(visitID).populate("blog").lean()
    const haveTime = visit && visit.created;
    const timeDiff = haveTime ? now.diff(moment(visit.created), 'seconds') : false;
    const fixTime = haveTime && update.time > timeDiff;
    if (fixTime) {
        update.time = timeDiff;
    }
    db.Visit.updateOne(query, update).exec();

    if (FEATURES_FLAGS.VIEW_HEARTBEAT_LOG) {
        const newHeartbeat: any = {
            visit: visitID,
            url: req.headers["referer"],
            useragent,
            time: body.A,
            ip: req.ip,
            created: moment().toDate()
        };
        if (event) {
            newHeartbeat.triggerBy = event;
        }
        db.LogHeartbeat.create(newHeartbeat);
    }

    const visitFound = visit && visit.blog;
    if (visitFound) {
        const query = {
            space: "/dashboard",
            $or: [
                { userId: visit.blog.user },
                { blogId: visit.blog._id.toString() }
            ]
        };
        const sockets = await db.Socket.find(query).lean()
        sockets.forEach((socket) => {
            const socketId = socket && socket.socketId;
            const mustEmitSetup = socketId && socketio;
            if (mustEmitSetup) {
                socketio.of("/dashboard").to(socketId).emit("update", true);
            }
        });
    }

    return res
}

export default function (fastify: FastifyInstance) {
    fastify.route({
        method,
        url,
        handler
    })
}