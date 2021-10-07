const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);


//criar a migration

// npx knex migrate make nome_da_migration


// npx knex migrate:make user_types;

//rodar migration

//knex migrate:latest