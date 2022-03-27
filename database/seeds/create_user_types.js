
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_types').insert([
        {name: 'comprador', created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'anunciante',created_at: knex.fn.now(), updated_at: knex.fn.now()},
        {name: 'corretor', created_at: knex.fn.now(), updated_at: knex.fn.now()}
      ]);
    });
};
