import { Model } from 'objection'
import knexLib from 'knex'
import Config from '../config/knexfile'

const knex = knexLib(Config)

const start = async () => {
  try {
    // We test if connection was successful
    await knex.raw("SELECT 'test connection';")

    Model.knex(knex)
  } catch (err) {
    throw err
  }
}

export default {
  knex,
  start
}
