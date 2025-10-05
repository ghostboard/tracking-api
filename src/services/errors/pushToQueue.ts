import TrackingErrorQueue from '../../sources/queues/TrackingErrorQueue';
import logger from '../../sources/logger';

export default async function pushToErrorQueue(input) {
  try {
    const item = {
      ...input,
      created: new Date(),
    };
    const jobId = `trackingError-${Date.now()}-${input.blogId}`;
    const options = {
      jobId,
      removeOnComplete: true,
      removeOnFail: 2,
    };
    return await TrackingErrorQueue.add(`item-${jobId}`, item, options);
  } catch (error: any) {
    logger.error(
      `errors.pushToQueue(${JSON.stringify(input)}) Error = ${error?.trace || error}`
    );
  }
}
