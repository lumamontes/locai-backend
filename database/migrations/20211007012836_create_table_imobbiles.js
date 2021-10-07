
exports.up = function (knex) {
    return knex.schema
        .createTable('imobbiles', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned().references('users.id');
            table.integer('imobbile_type_id').unsigned().references('imobbiles_types.id');
            table.string('ad_title', 200).notNullable();
            table.string('ad_description', 500).notNullable();
            table.float('ad_value').notNullable();
            table.float('room_quantity');
            table.float('bathroom_quantity');
            table.string('imobbile_adress', 200);
            table.string('imobbile_country', 200);
            table.string('imobbile_city', 200);
            table.string('imobbile_state', 200);
            table.boolean('with_furniture');
            table.boolean('accepts_pets');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('imobbiles');
};
