const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        const { user_id } = request.params;
        if (!!user_id) {
            try {
                const favorites = await knex.from('user_favorites').where({ user_id });
                response.status(201).json(favorites);
            } catch (error) {
                console.log(error);
            }
        } else {
            return response.
                status(400)
                .json({
                    error: true,
                    message: 'Usuário inválido'
                });
        }
    },

    async create(request, response) {
        const { property_id } = request.params;
        const property = await knex.from('properties').where('id', property_id);
        if (property.length == 0) {
            return response.
                status(400)
                .json({
                    error: true,
                    message: 'Não foi possível encontrar a propriedade para favoritar'
                });
        } else {
            try {
                await knex('user_favorites').insert({
                    user_id: request.user.user_id,
                    property_id
                });
                return response.
                    status(200)
                    .send();
            } catch (error) {
                return response.
                    status(400)
                    .json({
                        error: true,
                        message: 'Não foi possível favoritar a propriedade'
                    });
            }

        }
    }
}


