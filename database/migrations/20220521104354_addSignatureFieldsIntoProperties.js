
exports.up = function (knex) {
    return knex.schema
        .table('bookings', function (table) {
            table.string('signature_ip'),
            table.uuid('signature_hash').defaultTo(knex.raw('uuid_generate_v4()')),
            table.string('signature_name'),
            table.string('signature_cpf'),
            table.string('signature_email')
        })
};

exports.down = function (knex) {
    return knex.schema
    .table('bookings', function (table) {
        table.dropColumn('signature_ip'),
        table.dropColumn('signature_hash'),
        table.dropColumn('signature_name'),
        table.dropColumn('signature_cpf'),
        table.dropColumn('signature_email')
    })
};
