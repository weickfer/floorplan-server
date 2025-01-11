import Knex from 'knex'

export const knexConfig = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './database/migrations'
  },
  log: {
    debug(message) {
      console.log(message.sql)
    },
  },
}

export const k = Knex(knexConfig)
