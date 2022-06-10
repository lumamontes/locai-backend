const knex = require('../../database/knex');
const bcrypt = require('bcryptjs');
module.exports = {
    async index(request, response) {
        const { user_id } = request.query;
        if (user_id) {
            try {
                let bookings = await knex.from('bookings').where('booker_user_id', user_id);
                let results_booker=[];
                if(bookings.length > 0){
                    for (let booking of bookings) {
                        let property = await knex.select('ad_title','ad_value', 'ad_image', 'property_adress', 'property_city', 'property_neighborhood', 'ad_description').from('properties').where('id', booking.property_id).first()
                        ;
                        let user = await knex.select('name as user_name', 'telephone','email').from('users').where('id', booking.property_user_id).first()
                        let status = await knex.select('name as status').from('bookings_status').where('id', booking.status_id).first()
                        
                        const merged = Object.assign(booking, property, user, status)
                        results_booker.push(merged)
                    }
                }
                let bookings_property = await knex.from('bookings').where('property_user_id', user_id);
                let results_property=[];
                if(bookings_property.length > 0){
                    for (let booking of bookings_property) {
                        let property = await knex.select('ad_title','ad_value', 'ad_image').from('properties').where('id', booking.property_id).first()
                        ;
                        let user = await knex.select('name as user_name', 'telephone','email').from('users').where('id', booking.property_user_id).first()
                        let status = await knex.select('name as status').from('bookings_status').where('id', booking.status_id).first()
                        let user_booked = await knex.select('name as user_booked').from('users').where('id', booking.booker_user_id).first()
                        let user_email_booked = await knex.select('email as user_email_booked').from('users').where('id', booking.booker_user_id).first()
                        let user_telephone_booked = await knex.select('telephone as user_telephone_booked').from('users').where('id', booking.booker_user_id).first()
                        const merged = Object.assign(booking, property, user, status, user_booked, user_email_booked, user_telephone_booked)
                        results_property.push(merged)
                    }
                }
                return response
                    .json({
                        results_booker,
                        results_property
                    })
            } catch (error) {
                console.log(error)
                return response.json(error);
            }
        }

    },
    async create(request, response) {
        try {
            const {
                message_content,
                date_booking,
                time_booking,
                booker_user_id,
                property_user_id,
                property_id
            } = request.body;

            const status = await knex('bookings_status').first();

            await knex('bookings').insert({
                message_content,
                date_booking,
                time_booking,
                booker_user_id,
                property_user_id,
                property_id,
                status_id: status.id,
            });
            return response.status(201).json(
                {
                    message: 'Cadastro feito com sucesso!',
                }
            );

        } catch (error) {
            console.log(error);
            return response.json(error);
        }
    },
    async update(request, response) {
        const { id } = request.params;
        const changes = request.body;

        try {
            const count = await knex('bookings').where({ id }).update(changes);
            if (count) {
                response.status(200).json({ updated: count })
            } else {
                response.status(404).json({ message: "Registro não encontrado" })
            }
        } catch (err) {
            response.status(500).json({ message: "Erro ao atualizar", error: err })
        }
    },


}


// bookings 
// id
// message_content
// date_booking
// time_booking
// booker_user_id
// property_user_id
// property_id
// status_id
// created_at
// updated_at
