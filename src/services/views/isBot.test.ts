import isBot from './isBot';

describe('isBot', () => {
  test('it should be defined', () => {
    expect(isBot).toBeDefined();
  });
  test('it should detect as no bot', () => {
    const UA =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36';
    expect(isBot(UA)).toEqual(false);
  });
  test('it should detect as bot', () => {
    const UA = 'GoogleBot';
    expect(isBot(UA)).toEqual(true);
  });
  test('it should detect a custom config', () => {
    expect(isBot('FB_IAB')).toEqual(true);
  });
});
