export default {
  db: {
    uri: process.env.DATABASE_URL || 'postgres://postgres@localhost:5433/payday-db-tests'
  },
  logger: {
    enabled: false
  }
}