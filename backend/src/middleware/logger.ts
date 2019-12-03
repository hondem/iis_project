import logger from '../utils/logger'
import { Context } from 'koa'

/**
 * Middleware for loggin incomming requests
 * @param ctx 
 * @param next 
 */
const loggerMiddleware = (ctx: Context, next) => {
  logger.info("Incomming request: ", ctx.request)
  return next()
}

export default loggerMiddleware