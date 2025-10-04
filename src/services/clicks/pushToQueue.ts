import TrackingClickQueue from '../../sources/queues/TrackingClickQueue';
import logger from '../../sources/logger';

export default async function pushToErrorQueue(input) {
  try {
    const item = {
      ...input,
      created: new Date(),
    };
    const jobId = `trackingClick-${Date.now()}-${input.blogId}-${input.origin}`;
    const options = {
      jobId,
      removeOnComplete: true,
      removeOnFail: 2,
    };
    return await TrackingClickQueue.add(`item-${jobId}`, item, options);
  } catch (error: any) {
    logger.error(
      `errors.pushToQueue(${JSON.stringify(input)}) Error = ${error?.trace || error}`
    );
  }
}
