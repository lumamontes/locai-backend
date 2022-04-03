const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const FilesController = require('../controllers/FilesController');
const imgur = require("imgur");
const fs = require("fs");
const knex = require('../../database/knex');

router.get('/get_files', FilesController.index);
router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const file=req.file;
    try {
        // console.log(req);
        const url = await imgur.uploadFile(`./tmp/uploads/${file.filename}`);
        await knex('files').insert({
            url: url.link, 
        });
        fs.unlinkSync(`./tmp/uploads/${file.filename}`);
        return res.status(201).send();            
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
        return res.json(error);
    }
});

module.exports = router;