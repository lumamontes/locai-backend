const express = require('express');
const router = express.Router();
const PropertiesCategoriesController = require('../controllers/PropertiesCategoriesController');

router.get('/properties_categories', PropertiesCategoriesController.index);

module.exports = router;