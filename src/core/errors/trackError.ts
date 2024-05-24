import pushToQueue from '../../services/errors/pushToQueue';

export default async function trackError(
  blogId: string,
  location: string,
  error: string,
  useragent: string,
  referer: string
): Promise<any> {
  const params = {
    blogId,
    location,
    error,
    useragent,
    referer,
  };
  return pushToQueue(params);
}
