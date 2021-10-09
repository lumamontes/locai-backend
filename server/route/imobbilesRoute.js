const express = require('express');
const router = express.Router();
const ImobbilesController = require('../controllers/ImobbilesController');

router.get('/imobbiles', ImobbilesController.index);
router.get('/imobbiles/:id', ImobbilesController.single_read) 
router.post('/imobbiles', ImobbilesController.create);
router.put('/imobbiles/:id', ImobbilesController.update);
router.delete('/imobbiles/:id', ImobbilesController.delete);

module.exports = router;