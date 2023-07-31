# ghostboard api

## stack

fastify + typescript + mongoose

## Dependencies

- IMPORTANT: geoip-country v3 due license
- referer-parser: update referer.yml

## dependencies size

`npx slow-deps --prod`

```
--------------------------------------------------------
| Dependency               | Time    | Size   | # Deps |
--------------------------------------------------------
| @newrelic/fastify        | 1m 6.6s | 35 MB  | 125    |
| fastify                  | 6.7s    | 6.2 MB | 48     |
| fastify-jwt              | 5.1s    | 4.7 MB | 32     |
| fast-glob                | 5.1s    | 524 KB | 16     |
| pino-pretty              | 4.8s    | 999 KB | 36     |
| turbo-geoip-country      | 4.4s    | 19 MB  | 26     |
| pg                       | 4.2s    | 494 KB | 16     |
| @socket.io/redis-emitter | 3.3s    | 152 KB | 7      |
| referer-parser           | 2.5s    | 1.5 MB | 7      |
| knex                     | 2.3s    | 3.2 MB | 23     |
| fastify-helmet           | 2.3s    | 131 KB | 3      |
| fastify-formbody         | 2.1s    | 62 KB  | 4      |
| redis                    | 2s      | 283 KB | 5      |
| fastify-cors             | 1.5s    | 113 KB | 5      |
| fastify-no-icon          | 1.5s    | 163 KB | 6      |
| fastify-plugin           | 1.4s    | 32 KB  | 1      |
| ua-parser-js             | 1.3s    | 111 KB | 1      |
| dotenv                   | 1.3s    | 73 KB  | 1      |
| querystring              | 829ms   | 10 KB  | 1      |
| isbot                    | 815ms   | 67 KB  | 1      |
| moment                   | 715ms   | 4.2 MB | 1      |
--------------------------------------------------------
Total time (non-deduped): 2m 0.6s
Total size (non-deduped): 77 MB
```