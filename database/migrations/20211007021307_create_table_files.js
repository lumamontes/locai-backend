
exports.up = function(knex) {
    return knex.schema
    .createTable('files', function(table){
        table.increments('id').unsigned().primary();
        table.integer('property_id').unsigned().references('properties.id');
        table.string('url', 300);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('files');
  };