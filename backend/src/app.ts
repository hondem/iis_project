import Koa from 'koa'

// Importing config
import Config from './config'

// Routing
import Routes from './routes'

// Database
import Database from './database'

// Utils
import logger from './utils/logger'

// Middlewares
import koaBodyparser from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaCors from 'kcors'
import loggerMiddleware from './middleware/logger'
import errorMiddleware from './middleware/errors'

const app: any = new Koa()

app.use(koaCompress())
app.use(koaCors(Config.server.cors))
app.use(koaBodyparser())
app.use(loggerMiddleware)
app.use(errorMiddleware.errorMiddleware)
app.use(Routes)
app.use(errorMiddleware.notFound)

/**
 * Server start
 */
app.start = async() => {
  // Start database connection
  logger.info("Estabilishing DB connection...")

  try{
    await Database.start()
  } catch(err){
    setTimeout(app.start.bind(this), 5000)
  }
}

app.stop = () => {
  logger.info("Stopping app...")
}

app.listen(Config.server.port, () => {
  logger.info(`App has started on port: ${Config.server.port} :)`)
})

if (require.main === module){
  logger.info("Starting app...")
  app.start()
}

/**
 * If application is closing
 */
process.once('SIGINT', () => { app.stop() })
process.once('SIGTERM', () => { app.stop() })

export default app