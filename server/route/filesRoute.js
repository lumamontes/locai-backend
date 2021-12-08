const express = require('express');
const router = express.Router();
const ImobbilesTypesController = require('../controllers/ImobbilesTypesController'); 
const multer = require('multer');
const multerConfig = require('../config/multer');
const FilesController = require('../controllers/FilesController');
const imgur = require("imgur");
const fs = require("fs");
router.get('/get_files:user_id', ImobbilesTypesController.index);
router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const file=req.file;
    try {
        const url = await imgur.uploadFile(`./tmp/uploads/${file.filename}`);
        res.json({url:url.link})
        fs.unlinkSync(`./tmp/uploads/${file.filename}`)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"})
    }
});

module.exports = router;

// campos:

//type
//name
//usuario_id
//profile_picture_id
//imobbile_id

// hash
// size
// extension