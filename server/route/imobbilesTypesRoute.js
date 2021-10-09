const express = require('express');
const router = express.Router();
const ImobbilesTypesController = require('../controllers/ImobbilesTypesController');

router.get('/imobbiles_types', ImobbilesTypesController.index);

module.exports = router;