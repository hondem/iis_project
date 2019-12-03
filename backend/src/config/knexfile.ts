import path from 'path'
import config from '../config'

import { types } from 'pg'

types.setTypeParser(1082, val => { // 1082 == https://github.com/brianc/node-pg-types/blob/master/lib/builtins.js
  return val
})

export = {
  client: 'pg',
  connection: config.db.uri,
  pool: {
    min: 1,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, './../database/migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, './../database/seeds'),
  }
}