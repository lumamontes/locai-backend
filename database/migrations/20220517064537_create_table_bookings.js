
exports.up = function (knex) {
    return knex.schema
        .createTable('bookings', function (table) {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.uuid('booker_user_id')
                .references('users.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.uuid('property_user_id')
                .references('users.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.uuid('property_id')
                .references('properties.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.uuid('status_id')
                .references('bookings_status.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.text('message_content').notNullable();
            table.date('date_booking').notNullable();
            table.string('time_booking').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('bookings');
};