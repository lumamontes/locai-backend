
exports.up = function(knex) {
    return knex.schema
    .createTable('user_favorites', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw("(UUID())"));
        table.uuid('user_id')
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    table.uuid('property_type_id')
        .references('properties_types.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('user_favorites');
};
