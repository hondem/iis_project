import Pino from 'pino'
import Config from '../config'

// Pino instance
const pino = Pino({ prettyPrint: Config.logger.prettyPrint })

export default pino