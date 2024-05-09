# Ghostboard Tracking API

This API receives all the tracking data from the Ghost blogs as views and clicks mainly. Also, any error from the tracking file. The data is processed in different queues asynchronously.

## Status

- trackView v3: pending helpers functions + tests
- workers on syncer

## Tech Stack 🤖

- NodeJS 20
- Fastify
- Typescript
- Redis
- BullMQ
- Jest
- Docker

## Tests 🧪

```
Test Suites: 1 skipped, 18 passed, 18 of 19 total
Tests:       7 skipped, 122 passed, 129 total
Snapshots:   0 total
Time:        10.246 s, estimated 11 s
```

## Dependencies 📦

`npx slow-deps --prod`

```
------------------------------------------------------
| Dependency               | Time  | Size   | # Deps |
------------------------------------------------------
| @newrelic/fastify        | 40.8s | 33 MB  | 153    |
| fast-glob                | 6.2s  | 527 KB | 16     |
| fastify                  | 5.8s  | 6.2 MB | 48     |
| @socket.io/redis-emitter | 4.7s  | 150 KB | 7      |
| referer-parser           | 3.9s  | 1.5 MB | 7      |
| pino-pretty              | 3.6s  | 1.0 MB | 36     |
| pg                       | 3.3s  | 494 KB | 16     |
| turbo-geoip-country      | 2.7s  | 20 MB  | 26     |
| knex                     | 2.6s  | 3.2 MB | 23     |
| redis                    | 2.4s  | 283 KB | 5      |
| fastify-cors             | 2.3s  | 113 KB | 5      |
| fastify-helmet           | 1.8s  | 131 KB | 3      |
| fastify-formbody         | 1.6s  | 63 KB  | 4      |
| fastify-no-icon          | 1.6s  | 163 KB | 6      |
| isbot                    | 1.6s  | 29 KB  | 1      |
| querystring              | 1.6s  | 10 KB  | 1      |
| ua-parser-js             | 1.5s  | 113 KB | 1      |
| dotenv                   | 985ms | 80 KB  | 1      |
| moment                   | 894ms | 4.4 MB | 1      |
| fastify-plugin           | 845ms | 32 KB  | 1      |
| ipaddr.js                | 802ms | 61 KB  | 1      |
------------------------------------------------------
Total time (non-deduped): 1m 31.5s
Total size (non-deduped): 72 MB
```
