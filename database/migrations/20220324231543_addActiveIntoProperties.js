
exports.up = function(knex) {
    return knex.schema.table('properties', table=>{
        table.boolean('active').defaultTo('false');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('properties', table=>{
      table.dropColumn('active')
    })
  };
  