# ghostboard api

## stack

fastify + typescript + mongoose
beanstalk: eb create tracking-api-18

## Dependencies

- IMPORTANT: geoip-country v3 due license
- referer-parser: update referer.yml

## dependencies size

`npx slow-deps --prod`

```
------------------------------------------------------
| Dependency               | Time  | Size   | # Deps |
------------------------------------------------------
| @newrelic/fastify        | 37s   | 35 MB  | 125    |
| @socket.io/redis-emitter | 5.1s  | 152 KB | 7      |
| fastify                  | 5s    | 6.2 MB | 48     |
| fastify-jwt              | 4.2s  | 4.7 MB | 32     |
| turbo-geoip-country      | 3.8s  | 19 MB  | 26     |
| referer-parser           | 3.3s  | 1.5 MB | 7      |
| fastify-cors             | 3.3s  | 113 KB | 5      |
| pg                       | 3.1s  | 494 KB | 16     |
| pino-pretty              | 2.2s  | 999 KB | 36     |
| fastify-formbody         | 2s    | 62 KB  | 4      |
| fast-glob                | 2s    | 524 KB | 16     |
| knex                     | 1.9s  | 3.2 MB | 23     |
| redis                    | 1.7s  | 283 KB | 5      |
| fastify-helmet           | 1.6s  | 131 KB | 3      |
| fastify-no-icon          | 1.6s  | 163 KB | 6      |
| isbot                    | 1.5s  | 67 KB  | 1      |
| fastify-plugin           | 1.4s  | 32 KB  | 1      |
| querystring              | 906ms | 10 KB  | 1      |
| dotenv                   | 892ms | 73 KB  | 1      |
| ua-parser-js             | 807ms | 111 KB | 1      |
| moment                   | 773ms | 4.2 MB | 1      |
------------------------------------------------------
Total time (non-deduped): 1m 24s
Total size (non-deduped): 77 MB
```