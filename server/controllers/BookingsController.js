const knex = require('../../database/knex');
const bcrypt = require('bcryptjs');
module.exports = {
    async index(request, response) {
        const { booker_user_id, property_user_id } = request.query;

        if (booker_user_id && property_user_id) {
            return response.
                status(200)
                .json({
                    error: true,
                    code: 'bookings.wrong_query_params',
                    message: 'Consulta inválida!'
                });
        }
        if (booker_user_id) {
            try {
                let users = await knex.from('bookings').where({ booker_user_id });
                return response
                    .json(users)
            } catch (error) {
                console.log(error)
                return response.json(error);
            }
        }

        if (property_user_id) {
            try {
                let users = await knex.from('bookings').where({ property_user_id });
                return response
                    .status(200)
                    .json(users)
            } catch (error) {
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
