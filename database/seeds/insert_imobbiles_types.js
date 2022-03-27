
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('properties_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('properties_types').insert([
        {name: 'Casa', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Apartamento', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Kitnet', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Flat', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Loft', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Studio', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'Cobertura', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      ]);
    });
};
