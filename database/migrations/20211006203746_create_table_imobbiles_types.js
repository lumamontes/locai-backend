
exports.up = function(knex) {
  return knex.schema
  .createTable('properties_types', function(table){
      table.increments('id').unsigned().primary();
      table.string('name', 200).notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('properties_types');
};
