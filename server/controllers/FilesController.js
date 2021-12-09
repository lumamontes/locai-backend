const knex = require('../../database/knex');
const imgur = require("imgur");
module.exports = {
    async index(req, res) {
        try {
            let files = await knex.from('files')

            return res.json(files);          
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "server error"})
            return response.json(error);
        }
    },
}


