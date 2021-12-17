const express = require('express');
const router = express.Router();
const ImobbilesController = require('../controllers/ImobbilesController');
const multer = require('multer');
const multerConfig = require('../config/multer');

router.get('/imobbiles', ImobbilesController.index);
router.get('/imobbiles/:id', ImobbilesController.single_read) 
router.get('/imobbiles_user/:user_id', ImobbilesController.single_user) 
router.post('/imobbiles', multer(multerConfig).single('file'), ImobbilesController.create);
router.put('/imobbiles/:id', ImobbilesController.update);
router.delete('/imobbiles/:id', ImobbilesController.delete);

module.exports = router;