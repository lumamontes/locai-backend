
exports.up = function (knex) {
    return knex.schema
      .createTable('bookings_status', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string('name', 200).notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTable('bookings_status');
  };
  
//   bookings_status
//   1- pending/aguardando confirmação 
//   2- confirmed
//   3- canceled

