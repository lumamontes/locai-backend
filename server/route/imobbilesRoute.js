const express = require('express');
const router = express.Router();
const ImobbilesController = require('../controllers/ImobbilesController');

router.get('/imobbiles', ImobbilesController.index);
router.get('/imobbiles/:id', async function (req, res) {

}); 
router.post('/imobbiles', ImobbilesController.create);
router.put('/imobbiles/:id', ImobbilesController.update);

router.delete('/imobbiles/:id', ImobbilesController.delete);

module.exports = router;