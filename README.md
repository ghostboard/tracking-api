# ghostboard api

## stack

fastify + typescript + mongoose

## Dependencies

- IMPORTANT: geoip-country v3 due license
- referer-parser: update referer.yml

## dependencies size

`npx slow-deps --prod`

```
------------------------------------------------------
| Dependency               | Time  | Size   | # Deps |
------------------------------------------------------
| @newrelic/fastify        | 7.6s  | 35 MB  | 125    |
| referer-parser           | 2.2s  | 1.5 MB | 7      |
| fastify                  | 1.5s  | 6.2 MB | 48     |
| fastify-jwt              | 1.5s  | 4.6 MB | 32     |
| dotenv                   | 1.3s  | 73 KB  | 1      |
| fastify-helmet           | 1.3s  | 131 KB | 3      |
| mongoose                 | 1s    | 10 MB  | 29     |
| pino-pretty              | 973ms | 999 KB | 36     |
| @socket.io/redis-emitter | 952ms | 152 KB | 7      |
| turbo-geoip-country      | 949ms | 19 MB  | 26     |
| knex                     | 904ms | 3.2 MB | 23     |
| pg                       | 864ms | 494 KB | 16     |
| fast-glob                | 854ms | 525 KB | 16     |
| moment                   | 782ms | 4.2 MB | 1      |
| fastify-no-icon          | 765ms | 163 KB | 6      |
| fastify-cors             | 754ms | 113 KB | 5      |
| redis                    | 733ms | 283 KB | 5      |
| querystring              | 721ms | 10 KB  | 1      |
| fastify-formbody         | 713ms | 62 KB  | 4      |
| ua-parser-js             | 699ms | 111 KB | 1      |
| isbot                    | 693ms | 56 KB  | 1      |
| fastify-plugin           | 688ms | 32 KB  | 1      |
------------------------------------------------------
Total time (non-deduped): 28.4s
Total size (non-deduped): 87 MB
```