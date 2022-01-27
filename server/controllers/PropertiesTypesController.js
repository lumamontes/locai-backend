const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        try {
            let properties_types = await knex.from('properties_types')
            return response.json(properties_types);
        } catch (error) {
            return response.json(error);
        }
    },
}


