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
        async create(request, response, next) {
            try{
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
                return response.status(201).send('status: Imovel cadastrado com sucesso');
            }catch(error){
                    next(error);               
             }
        }
}


