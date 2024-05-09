export default {
  referer: {
    filterDomains: [
      'qo-search.com',
      'co-search.com',
      'qm-search.com',
      'adguard.com',
      'surf-es.com',
      'findgofind.org',
      'delta-search.com',
    ],
    email: [
      '//mail',
      'mail.',
      '//email',
      'email.',
      '//webemail',
      'webemail.',
      '//webmail',
      'webmail.',
    ],
  },
  readingEvents: ['focus', 'focusin', 'pageshow', 'visibilityState:visible'],
  exitEvents: {
    desktop: ['beforeunload', 'unload'],
    mobile: [
      'beforeunload',
      'unload',
      'blur',
      'focusout',
      'pagehide',
      'visibilityState:hidden',
    ],
  },
};
