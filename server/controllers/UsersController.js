const knex = require('../../database/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(request, response) {
        try {
            const { id } = request.params;
            let users = await knex.from('users')
            .where({id})
                
            return response.json(users);
        } catch (error) {
            return response.json(error);
        }
    },
    async create(request, response, next) {
        try {
            const {
                user_type_id,
                name,
                email,
                telephone,
                birth_date,
                national_register,
                city,
                state,
                profile_picture,
                password
            } = request.body;

            let hashedPassword = await bcrypt.hash(password, 8);
            // let password = hashedPassword;

            await knex('users').insert({
                user_type_id,
                name,
                email,
                telephone,
                birth_date,
                national_register,
                city,
                state,
                profile_picture,
                password: hashedPassword
            });
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    },
}


