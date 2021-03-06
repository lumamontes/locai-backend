const express = require('express');
const router = express.Router();
const PropertiesController = require('../controllers/PropertiesController');
const checkAuthMiddleware = require('../Middlewares/checkAuthMiddleware');
const multer  = require('multer')
const multerConfig = require('../config/multer');
router.get('/properties', PropertiesController.index);
router.get('/properties/:id', PropertiesController.single_read) 
router.get('/properties_user/:user_id', PropertiesController.single_user) 
router.post('/properties', checkAuthMiddleware,  multer(multerConfig).array('files', 5), PropertiesController.create);
router.put('/properties/:id', PropertiesController.update);
router.delete('/properties/:id', PropertiesController.delete);
module.exports = router;