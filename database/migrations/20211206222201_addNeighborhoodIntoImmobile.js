
exports.up = function(knex) {
  return knex.schema.table('imobbiles', table=>{
    table.string('imobbile_neighborhood', 128).after("imobbile_city")
  })
};

exports.down = function(knex) {
  return knex.schema.table('imobbiles', table=>{
    table.dropColumn('imobbile_neighborhood')
  })
};
