const knex = require('../../database/knex');
module.exports = { 
    async index(request, response) {
        try{
            let imoveis = await knex.from('imobbiles');
            return response.code(202).json(imoveis);               
        }catch(error){
                return response.json(error);               
            }
        },

}


