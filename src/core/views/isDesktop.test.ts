import isDesktop from './isDesktop';

describe('isDesktop', () => {
  test('it should be defined', () => {
    expect(isDesktop).toBeDefined();
  });
  test('it should detect useragent as desktop', () => {
    const UA =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36';
    expect(isDesktop(UA)).toEqual(true);
  });
  test('it should detect useragent as mobile', () => {
    const UA =
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36';
    expect(isDesktop(UA)).toEqual(false);
  });
});
