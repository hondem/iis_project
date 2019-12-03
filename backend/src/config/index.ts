/* eslint-disable global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

import _ from 'lodash'
import DefaultConfig from './default'
import { Config, EnvType } from '../types/config'

const env = process.env.NODE_ENV || 'local'

if (env === 'local') {
  require('dotenv').config({ silent: false })
}

const envConfPath = `./env/${env}`
const envConf = require(envConfPath)
const defaultConfig = DefaultConfig(<EnvType>env)

const resConf: Config = _.merge(defaultConfig, envConf)

export = resConf
