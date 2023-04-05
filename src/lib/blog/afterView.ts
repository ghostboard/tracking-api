import moment from 'moment'
import { FastifyRequest } from "fastify"
import getDomain from '../util/getDomain'
import hasGhostContentAPI from './hasGhostContentAPI'
import hasMailgunNewsletter from './hasMailgunNewsletter'
import updateAfterVisit from "../../services/blog/updateAfterVisit";
import updateFirstVisit from "../../services/user/updateFirstVisit";

export default async function afterView(params: any, req: FastifyRequest) {
    const body = (req.body as any)
    const update: any = {
        lastVisit: moment().utc().toDate()
    };
    const hasDomain = params.blog.domain;
    if (!hasDomain) {
        update.url = body.A;
        if (!update.url) {
            const protocolIndex = params.visit.url.indexOf('//') + 2;
            const firstSlash = params.visit.url.indexOf('/', protocolIndex) + 1;
            const domainUrl = params.visit.url.substring(0, firstSlash);
            if (domainUrl && domainUrl.length) {
                update.url = domainUrl;
            }
        }
	      update.url = update.url.split('?')[0];
        update.apiUrl = `${update.url}ghost`;
        update.domain = getDomain(body.F || body.A);
    }
    const isFirstVisit = !params.blog.firstVisit;
    params.isFirstVisit = isFirstVisit;
    if (isFirstVisit) {
        update.active = true;
        update.firstVisit = moment().utc().toDate();
	      updateFirstVisit(params.blog.user, update.firstVisit).then();
    }
    if (body.E) {
        // Generator
        update.version = body.E;
        if (update.version) {
            update.hasContentAPI = hasGhostContentAPI(update.version);
            update.hasNewsletter = hasMailgunNewsletter(update.version);
        }
    } else {
        update.hasContentAPI = true;
    }
    if (body.I) {
        update.favicon = body.I;
    }
    if (body.V) {
        update.trackVersion = body.V;
    }
		return updateAfterVisit(params.visit.blog, update);
}