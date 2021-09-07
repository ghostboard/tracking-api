import { client as cache } from '../../../sources/redis'
import getView from './getView'
import getCountTotalViews from './getCountTotalViews'
import getMobileCount from './getMobileCount'
import getUrl from './getUrl'
import getCountry from './getCountry'
import getReferer from './getReferer'
import deleteCountry from './deleteCountry'
import deleteReferer from './deleteReferer'
import deleteUrl from './deleteUrl'

export default async function onQuitView(blogId: string, viewId: string) {
    try {
        cache.zadd(`live:blog:${blogId}:queue:quit`, 'NX', new Date().getTime(), viewId, (e, reply) => {
            const ready = !e && reply
            if (ready) {
                cache.publish('live:queue:quit', blogId)
            }
            return ready
        })

        // const view:any = await getView(viewId)
        // if (!view) {
        //     return false
        // }
        // const { url, country, referer, mobile } = view
        // const blogId = view.blog;
        // const transactions: any[] = [];
        // if (blogId) {
        //     const conditions = [
        //         true,
        //         !!mobile,
        //         !!url,
        //         !!country,
        //         !!referer
        //     ]
        //     const promises: any = [
        //         getCountTotalViews(blogId), 
        //         getMobileCount(blogId),
        //         getUrl(blogId, url),
        //         getCountry(blogId, country),
        //         getReferer(blogId, referer),
        //     ]
        //     const results = conditions.map((c, i) => c ? promises[i] : Promise.resolve(false))
        //     const [
        //         totalViews,
        //         mobileCount,
        //         urlCount,
        //         countryCount,
        //         refererCount
        //     ] = await Promise.all(results)

        //     if (totalViews > 0) {
        //         transactions.push(["decr", `live:blog:${blogId}:count:total`])
        //     } else if (totalViews < 0) {
        //         transactions.push(["incrby", `live:blog:${blogId}:count:total`, totalViews*-1])
        //     }

        //     if (mobile) {
        //         if (mobileCount > 0) {
        //             transactions.push(["decr", `live:blog:${blogId}:count:mobile`])
        //         } else if (mobileCount < 0) {
        //             transactions.push(["incrby", `live:blog:${blogId}:count:mobile`, mobileCount * -1])
        //         }
        //     }

        //     const hasUrl = url && urlCount !== false
        //     if (hasUrl) {
        //         if (urlCount > 0) {
        //             transactions.push(["zincrby", `live:blog:${blogId}:urls`, -1, url])
        //         } else {
        //             deleteUrl(blogId, url).then()
        //         }
        //     }

        //     const hasCountry = country && countryCount !== false
        //     if (hasCountry) {
        //         if (countryCount > 0) {
        //             transactions.push(["zincrby", `live:blog:${blogId}:countries`, -1, country])
        //         } else {
        //             deleteCountry(blogId, country).then()
        //         }
        //     }

        //     const hasReferer = referer && refererCount !== false
        //     if (hasReferer) {
        //         if (refererCount > 0) {
        //             transactions.push(["zincrby", `live:blog:${blogId}:referers`, -1, referer])
        //         } else {
        //             deleteReferer(blogId, referer).then()
        //         }
        //     }
        //     transactions.push(["del", `live:view:${viewId}`])
        //     transactions.push(["del", `live:view:copy:${viewId}`])
        //     transactions.push(["del", `view:${viewId}`])
        //     cache.multi(transactions).exec()
        //     return true
        // }
        
        // return false
    } catch (e) {
        console.error('>> redis error onQuitView', e);
        return false;
    }
}