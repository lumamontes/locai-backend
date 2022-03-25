
exports.up = function(knex) {
    return knex.schema
    .createTableIfNotExists('user_favorites', function (table) {
        table.increments('id').unsigned().primary();
        table.integer('user_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('property_id').unsigned().references('properties.id').notNullable().onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('users');
};
