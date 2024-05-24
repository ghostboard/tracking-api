import TrackingNoscriptViewQueue from '../../sources/queues/TrackingNoscriptViewQueue';
import logger from '../../sources/logger';

export default async function pushToNoscriptQueue(input): Promise<any> {
  try {
    const item = {
      ...input,
      created: new Date(),
    };
    const randomNumber = Math.floor(Math.random() * 1000);
    const jobId = `trackingNoscript_${input.blogId}_${Date.now()}_${randomNumber}`;
    const options = {
      jobId,
      removeOnComplete: true,
      removeOnFail: 2,
    };
    return await TrackingNoscriptViewQueue.add(jobId, item, options);
  } catch (error: any) {
    logger.error(
      `errors.pushToNoscriptQueue(${JSON.stringify(input)}) Error = ${error?.trace || error}`
    );
  }
}
