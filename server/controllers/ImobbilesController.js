const knex = require('../../database/knex');
module.exports = {
    async index(request, response) {
        try {
            let imobbiles = await knex.from('imobbiles');
            return response.json(imobbiles);
        } catch (error) {
            return response.json(error);
        }
    },
    async create(request, response, next) {
        try {
            const {
                imobbile_type_id,
                user_id,
                ad_title,
                ad_description,
                ad_value,
                room_quantity,
                bathroom_quantity,
                imobbile_adress,
                imobbile_country,
                imobbile_state,
                with_furniture,
                accepts_pets,
            } = request.body;
            await knex('imobbiles').insert({
                imobbile_type_id,
                user_id,
                ad_title,
                ad_description,
                ad_value,
                room_quantity,
                bathroom_quantity,
                imobbile_adress,
                imobbile_country,
                imobbile_state,
                with_furniture,
                accepts_pets,
            });
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async update(request, response, next) {
        try {
            const {
                imobbile_type_id,
                user_id,
                ad_title,
                ad_description,
                ad_value,
                room_quantity,
                bathroom_quantity,
                imobbile_adress,
                imobbile_country,
                imobbile_state,
                with_furniture,
                accepts_pets,
            } = request.body;
            const { id } = request.params;
            await knex('imobbiles')
                .update(                
                    {imobbile_type_id,
                    user_id,
                    ad_title,
                    ad_description,
                    ad_value,
                    room_quantity,
                    bathroom_quantity,
                    imobbile_adress,
                    imobbile_country,
                    imobbile_state,
                    with_furniture,
                    accepts_pets})
                .where({id});
                return response.send();
        } catch (error) {
            next(error)
        }
    },
    async delete(request, response, next) {
        try {
            const { id } = request.params;
            await knex('imobbiles')
                .where({id})
                .del()
                return response.send();
        } catch (error) {
            next(error)
        }
    }
}


