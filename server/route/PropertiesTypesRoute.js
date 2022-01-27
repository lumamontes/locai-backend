const express = require('express');
const router = express.Router();
const PropertiesTypesController = require('../controllers/PropertiesTypesController');

router.get('/properties_types', PropertiesTypesController.index);

module.exports = router;