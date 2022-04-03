// Update with your config settings.
require('dotenv').config()
module.exports = {
    development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      // port : 3306,
      user : 'postgres',
      // password : '123456789',
      database : 'tcc',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    },
    // debug:true
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