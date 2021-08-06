export default {
    bot: {
        extendWith: [
            'FB_IAB'
        ]
    },
    referer: {
        filterDomains: [
            'qo-search.com', 'co-search.com', 'qm-search.com', 'adguard.com', 'surf-es.com', 
            'findgofind.org', 'delta-search.com'
        ],
        email: [
            '//mail',
            'mail.',
            '//email',
            'email.',
            '//webemail',
            'webemail.',
            '//webmail',
            'webmail.'
        ]
    }
}