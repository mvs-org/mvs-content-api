import * as apicache from 'apicache'
import * as redis from 'redis'
import {
    CACHE_DEBUG,
    CACHE_ENABLED,
    CACHE_REDIS,
    CACHE_REDIS_HOST,
    CACHE_REDIS_PORT,
    CACHE_REDIS_PREFIX,
} from '../config/cache.config'

console.log(`CACHE ENABLED: ${CACHE_ENABLED}`)

export const cache = apicache
    .options({
        debug: CACHE_DEBUG,
        enabled: CACHE_ENABLED,
        statusCodes: { include: [200] },
        ... (CACHE_REDIS && {
            redisClient: redis.createClient({
                host: CACHE_REDIS_HOST,
                port: CACHE_REDIS_PORT,
                prefix: CACHE_REDIS_PREFIX,
            }),
        }),
    })
    .middleware
