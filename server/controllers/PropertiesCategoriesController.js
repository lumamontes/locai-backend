const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        try {
            let properties_categories = await knex.from('properties_categories')
            return response.json(properties_categories);
        } catch (error) {
            return response.json(error);
        }
    },
}


