
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('properties_categories').del()
    .then(function () {
      return knex('properties_categories').insert([
        {name: 'Residencial'},
        {name: 'Temporada'}
      ]);
    });
};
