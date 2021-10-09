const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        try {
            let imobbiles_types = await knex.from('imobbiles_types')
            return response.json(imobbiles_types);
        } catch (error) {
            return response.json(error);
        }
    },
}


