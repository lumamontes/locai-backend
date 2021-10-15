
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('imobbiles_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('imobbiles_types').insert([
        {id: 1, name: 'Casa', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 2, name: 'Apartamento', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 3, name: 'Kitnet', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 4, name: 'Flat', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 5, name: 'Loft', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 6, name: 'Studio', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 7, name: 'Cobertura', created_at: knex.fn.now(), updated_at: knex.fn.now()},
      ]);
    });
};
