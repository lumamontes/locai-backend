const express = require('express');
const router = express.Router();
const PropertiesController = require('../controllers/PropertiesController');
const multer = require('multer');
const multerConfig = require('../config/multer');
const checkAuthMiddleware = require('../Middlewares/checkAuthMiddleware');

router.get('/properties', PropertiesController.index);
router.get('/properties/:id', PropertiesController.single_read) 
router.get('/properties_user/:user_id', PropertiesController.single_user) 
router.post('/properties', checkAuthMiddleware, PropertiesController.create);
router.put('/properties/:id', PropertiesController.update);
router.delete('/properties/:id', PropertiesController.delete);
module.exports = router;