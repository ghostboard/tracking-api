# ghostboard api

## stack

fastify + typescript + mongoose

## Dependencies

- IMPORTANT: geoip-country v3 due license
- referer-parser: update referer.yml

## dependencies size

`npx cost-of-modules`

```
------------------------------------------------------
| Dependency               | Time  | Size   | # Deps |
------------------------------------------------------
| @newrelic/fastify        | 41.2s | 35 MB  | 125    |
| fastify-jwt              | 5s    | 4.6 MB | 32     |
| @socket.io/redis-emitter | 4s    | 152 KB | 7      |
| referer-parser           | 3.8s  | 1.5 MB | 7      |
| mongoose                 | 3.5s  | 10 MB  | 29     |
| pino-pretty              | 3.5s  | 999 KB | 36     |
| fastify                  | 3.2s  | 6.2 MB | 48     |
| fast-glob                | 3s    | 519 KB | 16     |
| fastify-helmet           | 2.9s  | 131 KB | 3      |
| pg                       | 2.7s  | 494 KB | 16     |
| turbo-geoip-country      | 2.5s  | 18 MB  | 26     |
| fastify-formbody         | 2.2s  | 62 KB  | 4      |
| fastify-cors             | 2.1s  | 113 KB | 5      |
| knex                     | 1.8s  | 3.2 MB | 23     |
| redis                    | 1.7s  | 283 KB | 5      |
| ua-parser-js             | 1.6s  | 111 KB | 1      |
| isbot                    | 1.6s  | 56 KB  | 1      |
| fastify-no-icon          | 866ms | 163 KB | 6      |
| moment                   | 866ms | 4.2 MB | 1      |
| fastify-plugin           | 823ms | 32 KB  | 1      |
| dotenv                   | 801ms | 73 KB  | 1      |
| querystring              | 770ms | 10 KB  | 1      |
------------------------------------------------------
Total time (non-deduped): 1m 30.4s
Total size (non-deduped): 87 MB
```