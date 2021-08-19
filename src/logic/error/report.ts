import create from '../../services/trackerDebug/create'

export default async function heartbeat(blogId: string, location: string, error: string, useragent: string, referer: string): Promise<any> {
    return create(blogId, location, error, useragent, referer)
}