
exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.integer('user_type_id').unsigned().references('user_types.id')
            table.string('name', 200).notNullable();
            table.string('email', 200).notNullable().unique();
            table.string('telephone', 200).notNullable();
            table.date('birth_date');
            table.float('national_register');
            table.string('city', 200);
            table.string('state', 200);
            table.string('profile_picture', 300);
            table.string('password', 300);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('users');
};

