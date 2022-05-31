
exports.up = function (knex) {
  return knex.schema
      .table('users', function (table) {
          table.string('cpf')
      })
};

exports.down = function (knex) {
  return knex.schema
  .table('users', function (table) {
      table.dropColumn('cpf')
  })
};
