import moment from "moment"
import mongoose from "mongoose"
import db from '../../models'
import FEATURES_FLAGS from '../../config/features'
import VIEWS_CONFIG from '../../config/views'
import getView from "../../lib/cache/live/getView"
import onReAddView from "../../lib/cache/live/onReAddView"
import onQuitView from "../../lib/cache/live/onQuitView"
import emitDashboard from "../../lib/socket/emitDashboard"
import isMobile from "../../lib/views/isMobile"
import isTablet from "../../lib/views/isTablet"

export default async function heartbeat(viewId: string, time: number, event: string, useragent: string): Promise<any> {
    const isValidId = mongoose.Types.ObjectId.isValid(viewId)
    if (!isValidId) {
        return { code: 401, message: 'Invalid viewId' }
    }

    let visit: any = await getView(viewId)
    if (!visit) {
        return false
    }

    const blogId = visit && visit.blog;
    const isNegativeTime = time < 0;
    if (isNegativeTime) {
        time *= -1;
    }
    if (time > 0) {
        const now = moment();
        const query = {
            _id: viewId
        };
        const update: any = {
            time
        };
        const haveTime = visit && visit.created;
        const timeDiff = haveTime ? now.diff(moment(visit.created), 'seconds') : false;
        const fixTime = haveTime && update.time > timeDiff;
        if (fixTime) {
            update.time = timeDiff;
        }
        db.Visit.updateOne(query, update).exec();
    }

    if (event) {
        const mobileExitEvents = VIEWS_CONFIG.exitEvents.mobile
        const desktopExitEvents = VIEWS_CONFIG.exitEvents.desktop
        const readingEvents = VIEWS_CONFIG.readingEvents
        const useragentIsMobile = isMobile(useragent);
        const useragentIsTablet = isTablet(useragent);
        const isDesktop = !useragentIsMobile && !useragentIsTablet;
        const exitEvents = isDesktop ? desktopExitEvents : mobileExitEvents
        const isOffline = exitEvents.includes(event);
        const isReading = readingEvents.includes(event);
        if (isOffline) {
            onQuitView(blogId, viewId).then((done) => done && emitDashboard(blogId)).then();
        } else if (isReading) {
            onReAddView(blogId, viewId).then((done) => done && emitDashboard(blogId)).then();
        }
    }

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

    return true
}