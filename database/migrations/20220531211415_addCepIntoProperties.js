exports.up = function (knex) {
  return knex.schema
      .table('properties', function (table) {
          table.string('cep')
      })
};

exports.down = function (knex) {
  return knex.schema
  .table('properties', function (table) {
      table.dropColumn('cep')
  })
};