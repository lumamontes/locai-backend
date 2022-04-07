const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        const { user_id } = request.params;
        if (!!user_id) {
            try {
                const favorites = await knex.from('user_favorites').where({ user_id });
                response.status(201).json(favorites);
            } catch (error) {
                return response.
                status(400)
                .json({
                    error: true,
                    code: 'user_favorites.invalid',
                    message: 'Erro ao retornar favoritos'
                });
            }
        } else {
            return response.
                status(400)
                .json({
                    error: true,
                    code: 'user.invalid',
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
                    code: 'property.not_found',
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
                console.log(error);
                return response.
                    status(400)
                    .json({
                        error: true,
                        code: 'property.invalid',
                        message: 'Não foi possível favoritar a propriedade'
                    });
            }

        }
    },
    async delete(request, response, next) {
        try {
            const { id } = request.params;
            await knex('user_favorites')
                .where({ id })
                .del()
            return response.send();
        } catch (error) {
            next(error)
        }
    }
}


