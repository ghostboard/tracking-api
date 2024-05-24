import { jest } from '@jest/globals';
import * as pushToQueue from '../../services/views/pushToQueue';
import * as getBlogForVisits from '../../services/blogs/getBlogForVisits';
import * as getBlogFilters from '../../services/blogs/getBlogFilters';
import * as getBlogHasClickTracking from '../../services/blogs/getBlogHasClickTracking';
import trackView from './trackView';

describe('core/views/trackView', () => {
  const getBlogForVisitsSpy = jest.spyOn(getBlogForVisits, 'default');
  const getBlogFiltersSpy = jest.spyOn(getBlogFilters, 'default');
  const getBlogHasClickTrackingSpy = jest.spyOn(
    getBlogHasClickTracking,
    'default'
  );
  const pushToQueueSpy = jest.spyOn(pushToQueue, 'default');

  test('should not track the view if missing blogId', async () => {
    try {
      await trackView('', '', '', '', '', '', '', {});
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('INVALID_BLOG_ID');
      expect(error.statusCode).toEqual(401);
    }
  });

  test('should not track the view if the useragent is a bot', async () => {
    try {
      await trackView('test', '/', '', '', '', 'Bot test', '', {});
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('USERAGENT_IS_BOT');
      expect(error.statusCode).toEqual(202);
    }
  });

  test('should not track the view if the blog is not found', async () => {
    getBlogForVisitsSpy.mockReturnValue(Promise.resolve(false));
    getBlogFiltersSpy.mockReturnValue(Promise.resolve([]));
    getBlogHasClickTrackingSpy.mockReturnValue(Promise.resolve(false));
    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    try {
      await trackView('test', '/', '', '', '', useragent, '', {});
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('BLOG_NOT_FOUND');
      expect(error.statusCode).toEqual(404);
    }
  });

  test('should not track the view if it is a post preview', async () => {
    getBlogFiltersSpy.mockReturnValue(Promise.resolve([]));
    getBlogForVisitsSpy.mockReturnValue(
      Promise.resolve({ enableClient: true })
    );
    getBlogHasClickTrackingSpy.mockReturnValue(Promise.resolve(false));
    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    try {
      await trackView('test', '/p/whatever-123', '', '', '', useragent, '', {});
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('IS_PREVIEW');
      expect(error.statusCode).toEqual(202);
    }
  });

  test('should not track the view if the user IP is blocked', async () => {
    const requestIp = '12.34.56.78';
    getBlogFiltersSpy.mockReturnValue(Promise.resolve([requestIp]));
    getBlogForVisitsSpy.mockReturnValue(
      Promise.resolve({ enableClient: true, domain: 'test.com' })
    );
    getBlogHasClickTrackingSpy.mockReturnValue(Promise.resolve(false));
    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    try {
      await trackView(
        'test',
        '/',
        'http://test.com',
        '',
        '',
        useragent,
        requestIp,
        {}
      );
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('BLOCKED_IP');
      expect(error.statusCode).toEqual(202);
    }
  });

  test('should not track the view if the blog is inactive', async () => {
    getBlogFiltersSpy.mockReturnValue(Promise.resolve([]));
    getBlogForVisitsSpy.mockReturnValue(
      Promise.resolve({ enableClient: false })
    );
    getBlogHasClickTrackingSpy.mockReturnValue(Promise.resolve(false));
    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    try {
      await trackView('test', '/', '', '', '', useragent, '', {});
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('INACTIVE_BLOG');
      expect(error.statusCode).toEqual(400);
    }
  });

  test('should not track the view if it is a different domain', async () => {
    getBlogFiltersSpy.mockReturnValue(Promise.resolve([]));
    getBlogForVisitsSpy.mockReturnValue(
      Promise.resolve({ enableClient: true, domain: 'test.com' })
    );
    getBlogHasClickTrackingSpy.mockReturnValue(Promise.resolve(false));
    const requestIp = '12.34.56.78';
    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    try {
      await trackView(
        'test',
        '/',
        'http://invalid.com',
        '',
        '',
        useragent,
        requestIp,
        {}
      );
      expect(true).toEqual(false);
    } catch (error: any) {
      expect(error.message).toBe('INVALID_REFERER');
      expect(error.statusCode).toEqual(400);
    }
  });

  test('should track the view and include click tracking', async () => {
    getBlogFiltersSpy.mockReturnValue(Promise.resolve([]));
    getBlogForVisitsSpy.mockReturnValue(
      Promise.resolve({ enableClient: true, domain: 'test.com' })
    );
    getBlogHasClickTrackingSpy.mockReturnValue(Promise.resolve(true));
    pushToQueueSpy.mockImplementation(() => Promise.resolve(true));
    const requestIp = '12.34.56.78';
    const useragent =
      'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion';
    const output = await trackView(
      'test',
      '/',
      'http://test.com',
      '',
      '',
      useragent,
      requestIp,
      {}
    );
    expect(output).toHaveProperty('id');
    expect(output).toHaveProperty('tc');
    expect(output.tc).toEqual(1);
    expect(pushToQueueSpy).toHaveBeenCalled();
  });
});
