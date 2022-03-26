const express = require('express');
const router = express.Router();
const UserFavoritesController = require('../controllers/UserFavoritesController');
const checkAuthMiddleware = require('../Middlewares/checkAuthMiddleware');


// router.get('/user_favorites', UsersFavorites.index);
router.post('/user_favorites/:property_id', checkAuthMiddleware,  UserFavoritesController.create);
router.get('/user_favorites/:user_id', checkAuthMiddleware,  UserFavoritesController.index);

module.exports = router;