import isDesktop from './isDesktop';
import pushToHeartbeatQueue from '../../services/views/pushToHeartbeatQueue';

export default async function trackHeartbeat(
  viewId: string,
  time: number,
  event: string | undefined,
  useragent: string | undefined,
  scrollPercent: number | undefined
): Promise<any> {
  const isValidId = viewId && viewId.length > 12;
  if (!isValidId) {
    return false;
  }
  const isUseragentDesktop = isDesktop(useragent);
  const params = {
    viewId,
    time,
    event,
    isDesktop: isUseragentDesktop,
	  scrollPercent
  };
  return pushToHeartbeatQueue(params);
}
