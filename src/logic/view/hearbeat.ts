import moment from "moment"
import mongoose from "mongoose"
import db from '../../db/models'
import { socketio } from '../../db/socket'
import FEATURES_FLAGS from '../../config/features'
import onReAddView from "../../lib/cache/live/onReAddView"
import onQuitView from "../../lib/cache/live/onQuitView"
import isMobile from "../../lib/views/isMobile"
import isTablet from "../../lib/views/isTablet"

export default async function heartbeat(viewId: string, time: number, event: string, useragent: string): Promise<any> {
    const isValidId = mongoose.Types.ObjectId.isValid(viewId)
    if (!isValidId) {
        return { code: 401, message: 'Invalid viewId' }
    }

    const query = {
        _id: viewId
    };
    const now = moment();
    const isNegativeTime = time < 0;
    if (isNegativeTime) {
        time *= -1;
    }
    const update: any = {
        time
    };
    if (event) {
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
            db.Live.updateOne({ visit: viewId }, { exit: new Date() }).exec();
            onQuitView(viewId).then(console.log);
        }
        const isReading =
            [
                "focus",
                "focusin",
                "pageshow",
                "visibilityState:visible"
            ].indexOf(event) !== -1;
        if (isReading) {
            db.Live.updateOne({ visit: viewId }, { exit: null }).exec();
            onReAddView(viewId).then(console.log);
        }
    }
    const visit = await db.Visit.findById(viewId).populate("blog").lean()
    const haveTime = visit && visit.created;
    const timeDiff = haveTime ? now.diff(moment(visit.created), 'seconds') : false;
    const fixTime = haveTime && update.time > timeDiff;
    if (fixTime) {
        update.time = timeDiff;
    }
    db.Visit.updateOne(query, update).exec();

    if (FEATURES_FLAGS.VIEW_HEARTBEAT_LOG) {
        const newHeartbeat: any = {
            visit: viewId,
            useragent,
            time,
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

    return true
}