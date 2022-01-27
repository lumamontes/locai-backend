
exports.up = function(knex) {
  return knex.schema.table('properties', table=>{
    table.string('property_neighborhood', 128).after("property_city")
  })
};

exports.down = function(knex) {
  return knex.schema.table('properties', table=>{
    table.dropColumn('property_neighborhood')
  })
};
