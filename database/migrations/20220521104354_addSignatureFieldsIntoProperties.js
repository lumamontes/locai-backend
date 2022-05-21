
exports.up = function (knex) {
    return knex.schema
        .table('properties', function (table) {
            table.string('signature_ip'),
            table.string('signature_hash'),
            table.string('signature_name'),
            table.string('signature_cpf'),
            table.string('signature_email')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropColumns('signature_ip', 'signature_hash', 'signature_name', 'signature_cpf', 'signature_email');
};
