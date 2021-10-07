
exports.up = function(knex) {
    return knex.schema
    .createTable('user_types', function(table){
        table.increments('id');
        table.string('name', 200);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('user_types');
  };
  