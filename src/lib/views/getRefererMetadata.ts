import RefererParser from 'referer-parser'
import CONFIG from '../../config/views'
import getDomain from '../util/getDomain'

export default function(params: any): any {
    const { blog, referer } = params;
    const output: any = {};
    let refererType: any = null;
    if (referer) {
        const refererData = new RefererParser(referer);
        output.referer = referer;
        output.refererDomain = getDomain(referer);
        refererType = 'unknown';
        const hasRefererIcon = refererData && refererData.referer;
        output.hasRefererIcon = !!hasRefererIcon;
        if (hasRefererIcon) {
            const refererName = refererData.referer.toLowerCase();
            output.refererName = refererName;
        }
        const sameDomain = referer.includes(blog.domain);
        const sameUrl = referer.includes(blog.url);
        const isInternal = sameDomain || sameUrl;
        if (isInternal) {
            refererType = "internal";
        } else {
            if (refererData.medium) {
                refererType = refererData.medium;
            }
            if (refererData.search_term) {
                output.searchQuery = refererData.search_term;
            }
        }
        const filterRefererList = CONFIG.referer.filterDomains;
        const mustFilter = filterRefererList.indexOf(output.refererDomain) !== -1;
        const fromGhostAdminUrl = referer.includes(`${blog.url}ghost`);
        const fromGhostAdminDomain = referer.includes(`${blog.domain}/ghost`);
        const filterVisitSource = mustFilter || fromGhostAdminUrl || fromGhostAdminDomain;
        if (filterVisitSource) {
            output.filterSource = true;
        }
    } else {
        refererType = "direct";
    }
    if (refererType) {
        output.refererType = refererType;
    }
    return output;
}