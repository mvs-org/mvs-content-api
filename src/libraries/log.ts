import { createSimpleLogger } from 'simple-node-logger'
const logger = createSimpleLogger({
    timestampFormat: 'YYYY-MM-DD HH:mm:ss',
})
logger.setLevel('all')

export const Logger = logger
