
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 300,
      user : 'root',
      password : '123456789',
      database : 'dbprojetiv3'
    }
  });