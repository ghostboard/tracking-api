import moment from 'moment'
import UAParser from 'ua-parser-js'
import querystring from 'querystring'
import urlParser from 'url'
import turboGeoip from 'turbo-geoip-country'
import { FastifyRequest } from "fastify"
import isEmail from "./isEmail"
import isMobile from "./isMobile"
import isTablet from "./isTablet"
import anonymIP from "./anonymIP"
import getRefererMetadata from "./getRefererMetadata"
import insert from "../../services/visit/insert";

export default async function saveView(params: any, req: FastifyRequest): Promise<string[]> {
    const useragent = req.headers["user-agent"];
    const ip = req.ip
    const useragentIsMobile = isMobile(useragent);
    const useragentIsTablet = isTablet(useragent);
    const UAData = UAParser(useragent);
    const country = turboGeoip.getCountry(ip)
    let fullURL = (req.body as any)?.U || req.headers["referer"];
    if (!fullURL) {
        fullURL = params.blog.url;
        if (params.slug) {
            fullURL += params.slug.substring(1);
        }
    }
    let device = 'desktop'
		if (useragentIsTablet) {
			device = 'tablet';
		} else if (useragentIsMobile) {
			device = 'mobile';
		}
    const newVisit: any = {
        blog: params.blog._id.toString(),
        url: fullURL,
        slug: params.slug,
	      ua: useragent,
        // useragent,
        browser: UAData.browser.name,
        os: UAData.os.name,
        device,
        // mobile: useragentIsMobile,
        // tablet: useragentIsTablet,
        // desktop: !useragentIsMobile && !useragentIsTablet,
        lang: params.lang,
        country,
        time: 0,
        ip: anonymIP(ip),
        created: moment().toDate()
    };
    if (params.postId) {
        newVisit.post = params.postId;
    }
    if (params.isNoscript) {
        newVisit.noscript = true
    }
    if (params.referer) {
        newVisit.referer = params.referer
    }
    const refererParams = {
        blog: params.blog,
        referer: params.referer
    };
    const refererData = getRefererMetadata(refererParams);
    const refererFields = ['refererDomain', 'refererType', 'hasRefererIcon', 'refererName', 'searchQuery', 'filterSource'];
    refererFields.forEach((field) => {
        if (refererData[field]) {
            newVisit[field] = refererData[field];
        }
    });
    const url = urlParser.parse(newVisit.url);
    if (url.query) {
        const queryData = querystring.parse(url.query);
        const UTMSource = queryData.utm_source;
        const UTMMedium = queryData.utm_medium;
        const UTMCampaign = queryData.utm_campaign;
        const UTMTerm = queryData.utm_term;
        const UTMContent = queryData.utm_content;
        if (UTMSource) {
            newVisit.UTMSource = Array.isArray(UTMSource) ? UTMSource[0] : UTMSource;
        }
        if (UTMMedium) {
            newVisit.UTMMedium = Array.isArray(UTMMedium) ? UTMMedium[0] : UTMMedium;
        }
        if (UTMCampaign) {
            newVisit.UTMCampaign = Array.isArray(UTMCampaign) ? UTMCampaign[0] : UTMCampaign;
        }
        if (UTMTerm) {
            newVisit.UTMTerm = Array.isArray(UTMTerm) ? UTMTerm[0] : UTMTerm;
        }
        if (UTMContent) {
            newVisit.UTMContent = Array.isArray(UTMContent) ? UTMContent[0] : UTMContent;
        }
    }
    const hasReferer = !!newVisit.refererName;
    const isUTMEmail = newVisit.UTMMedium && newVisit.UTMMedium.toLowerCase && newVisit.UTMMedium.toLowerCase() === 'email';
    const isEmailReferer = isEmail(newVisit.referer);
    const setFromEmail = (!hasReferer && isUTMEmail) || isEmailReferer;
    if (setFromEmail) {
        newVisit.refererType = 'email';
    }
		return insert(newVisit);
}