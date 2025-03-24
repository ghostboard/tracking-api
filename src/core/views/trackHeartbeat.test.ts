import { jest } from '@jest/globals';
import * as pushToHeartbeatQueue from '../../services/views/pushToHeartbeatQueue';
import trackHeartbeat from './trackHeartbeat';

describe('core/views/trackHeartbeat', () => {
  const pushToHeartbeatQueueSpy = jest.spyOn(pushToHeartbeatQueue, 'default');

  test('should not track the heartbeat view if missing viewId', async () => {
    const output = await trackHeartbeat('', 0, undefined, undefined, undefined);
    expect(output).toEqual(false);
  });

  test('should not track the heartbeat view if viewId is not valid', async () => {
    const output = await trackHeartbeat('test', 0, undefined, undefined, undefined);
    expect(output).toEqual(false);
  });

  test('should track the heartbeat', async () => {
    pushToHeartbeatQueueSpy.mockImplementation(() => Promise.resolve(true));

    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    const output = await trackHeartbeat(
      '12345678901234',
      12,
      'unload',
      useragent,
	    10
    );
    expect(output).toEqual(true);
    expect(pushToHeartbeatQueueSpy).toHaveBeenCalled();
  });
});
