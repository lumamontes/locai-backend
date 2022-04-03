
exports.up = function(knex) {
    return knex.schema
    .createTable('files', function(table){
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('property_id')
          .references('properties.id')
          .onUpdate('CASCADE')
      table.uuid('user_id')
          .references('users.id')
          .onUpdate('CASCADE')
        table.string('url', 300);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('files');
  };