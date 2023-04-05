import moment from "moment"
import mongoose from "mongoose"
import VIEWS_CONFIG from '../../config/views'
import getView from "../../lib/cache/live/getView"
import onQuitView from "../../lib/cache/live/onQuitView"
import emitDashboard from "../../lib/socket/emitDashboard"
import isDesktop from "../../lib/views/isDesktop"
import updateTime from "../../services/visit/updateTime";

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
    if (time > 0) {
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
	      updateTime(viewId, time).then();
    }

    if (event) {
        const mobileExitEvents = VIEWS_CONFIG.exitEvents.mobile
        const desktopExitEvents = VIEWS_CONFIG.exitEvents.desktop
        const isUADesktop = isDesktop(useragent)
        const exitEvents = isUADesktop ? desktopExitEvents : mobileExitEvents
        const isOffline = exitEvents.includes(event)
        if (isOffline) {
            onQuitView(blogId, viewId).then((done) => done && emitDashboard(blogId)).then();
        }
    }

    return true
}