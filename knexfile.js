require('dotenv').config()
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.HOST,
        // port : 3306,
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
    },
    // debug:true
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }

  },

  production: {
    client: 'pg',
    // connection: {
    //   host : process.env.PG_HOST,
    //   port : process.env.PG_PORT,
    //   user : process.env.PG_USER,
    //   password : process.env.PG_PASSWORD,
    //   database : process.env.PG_DATABASE,
    //   charset: 'utf8'
    // },
    connection: process.env.DATABASE_URL,
    ssl: {
      "require": true,
      "rejectUnauthorized": false
    },
    migrations: {
      directory: __dirname + '/database/migrations',
    },
    seeds: {
      directory: __dirname + '/database/seeds',
    }

  }

};