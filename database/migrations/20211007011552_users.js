
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.boolean('is_admin').defaultTo('false');
            table.boolean('is_realtor').defaultTo('false');
            table.string('name', 200).notNullable();
            table.string('email', 200).unique().notNullable();
            table.string('telephone', 200).notNullable();
            table.string('profession', 200);
            table.text('biography');
            table.date('birth_date');
            table.float('national_register');
            table.string('city', 200);
            table.string('state', 200);
            table.string('profile_picture', 300);
            table.string('password', 300).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('users');
};

