
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('bookings_status').del()
    .then(function () {
      return knex('bookings_status').insert([
        {name: 'Aguardando confirmação'},
        {name: 'Confirmado'},
        {name: 'Cancelado'},
        {name: 'Contrato assinado'},
      ]);
    });
};
