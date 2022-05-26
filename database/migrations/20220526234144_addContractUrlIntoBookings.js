exports.up = function (knex) {
  return knex.schema
      .table('bookings', function (table) {
          table.string('contract_url')
      })
};

exports.down = function (knex) {
  return knex.schema
      .dropColumns('contract_url');
};
