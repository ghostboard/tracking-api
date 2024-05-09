import { Queue } from 'bullmq';

const options: any = {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '', 10),
  },
};
const setSecurity = process.env.REDIS_PASSWORD;
if (setSecurity) {
  options.connection.password = process.env.REDIS_PASSWORD;
  options.connection.tls = {};
}
const TrackingViewHeartbeatQueue = new Queue(
  'TrackingViewHeartbeatQueue',
  options
);

export default TrackingViewHeartbeatQueue;
