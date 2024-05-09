import TrackingViewHeartbeatQueue from '../../sources/queues/TrackingViewHeartbeatQueue';
import logger from '../../sources/logger';

export default async function pushToHeartbeatQueue(input): Promise<any> {
  try {
    const item = {
      ...input,
      created: new Date(),
    };
    const jobId = `trackingHeartbeat_${input.viewId}_${input.time}`;
    const existingJob = await TrackingViewHeartbeatQueue.getJob(jobId);
    if (existingJob) {
      await existingJob.remove();
    }

    const options = {
      jobId,
      removeOnComplete: true,
      removeOnFail: 2,
      delay: 150,
    };
    return await TrackingViewHeartbeatQueue.add(jobId, item, options);
  } catch (error: any) {
    logger.error(
      `errors.pushToHeartbeatQueue(${JSON.stringify(input)}) Error = ${error?.trace || error}`
    );
  }
}
