// Update with your config settings.
require('dotenv').config()
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.HOSTDB,
      port : process.env.PORTDB,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    }

  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }

  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }

  }

};
