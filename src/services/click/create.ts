import * as crypto from "crypto";
import mongoose from "mongoose"
import turboGeoip from 'turbo-geoip-country'
import RefererParser from 'referer-parser'
// import mongoDb from '../../models'
import db from "../../sources/postgres"
import isMobile from "../../lib/views/isMobile";
import isTablet from "../../lib/views/isTablet";
import UAParser from "ua-parser-js";

export default async function (blogId: string, origin: string, target: string, title: string, text: string, image: string, useragent: string, ip: string) {
    const isValidId = mongoose.Types.ObjectId.isValid(blogId)
    if (!isValidId) {
        return { done: false, message: 'Invalid blogId' }
    }
    const newClick: any = {
        blog: blogId,
        origin,
        target,
        created: new Date()
    };
		if (image) {
        newClick.image = image;
    } else if (text || title) {
			newClick.text = text || title;
		}
		const proceed = newClick.text || newClick.image;
		if (!proceed) {
			return { done: false, message: 'Missing text and image' };
		}
		if (target) {
			const targetData = new RefererParser(target);
			const isSocial = targetData && targetData.referer && targetData.medium === 'social'
			if (isSocial) {
				newClick.social = targetData.referer.toLowerCase()
			}
		}
		if (useragent) {
			newClick.ua = useragent;
			const useragentIsMobile = isMobile(useragent);
			const useragentIsTablet = isTablet(useragent);
			let device = 'desktop'
			if (useragentIsTablet) {
				device = 'tablet';
			} else if (useragentIsMobile) {
				device = 'mobile';
			}
			newClick.device = device;
			const UAData = UAParser(useragent);
			if (UAData) {
				newClick.browser = UAData.browser.name;
				newClick.os = UAData.os.name;
			}
		}
		if (ip) {
			const country = turboGeoip.getCountry(ip)
			if (country) {
				newClick.country = country;
			}
		}

		const sqlClick = {...newClick};
		sqlClick.id = crypto.randomBytes(16).toString("hex")
		return db('clicks').insert(sqlClick);
		// return mongoDb.Click.create(newClick);
}