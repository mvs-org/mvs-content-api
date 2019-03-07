export const CACHE_ENABLED = (process.env.CACHE_ENABLED) ? process.env.CACHE_ENABLED === 'true' : false
export const CACHE_REDIS = (process.env.CACHE_REDIS) ? process.env.CACHE_REDIS === 'true' : false
export const CACHE_REDIS_HOST = (process.env.CACHE_HOST) ? process.env.CACHE_HOST : 'redis'
export const CACHE_REDIS_PREFIX = (process.env.CACHE_PREFIX) ? process.env.CACHE_PREFIX : 'newscontent'
export const CACHE_REDIS_PORT = (process.env.CACHE_PORT) ? parseInt(process.env.CACHE_PORT, 10) : 6379
export const CACHE_DEBUG = (process.env.CACHE_DEBUG) ? process.env.CACHE_DEBUG === 'true' : false
