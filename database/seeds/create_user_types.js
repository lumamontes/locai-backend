
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_types').insert([
        {id: 1, name: 'comprador', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 2, name: 'anunciante',created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {id: 3, name: 'corretor', created_at: knex.fn.now(), updated_at: knex.fn.now()}
      ]);
    });
};
