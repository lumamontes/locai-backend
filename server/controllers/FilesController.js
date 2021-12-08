const knex = require('../../database/knex');
const imgur = require("imgur");
const fs = require("fs");
module.exports = {
    async post(req, res) {
        const file=req.files[0];
        try {
            const url = await imgur.uploadFile(`../../tmp/uploads/${file.filename}`);
            res.json({url:url.data.link})
            fs.unlinkSync(`../../tmp/uploads/${file.filename}`)
        } catch (error) {
            console.log(err);
            res.status(500).json({message: "server error"})
            return response.json(error);
        }
    },
}


