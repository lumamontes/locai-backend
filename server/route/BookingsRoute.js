const { response } = require('express');
const express = require('express');
const knex = require('../../database/knex');
const router = express.Router();
const BookingsController = require('../controllers/BookingsController');
const checkAuthMiddleware = require('../Middlewares/checkAuthMiddleware');


// router.get('/user_favorites', UsersFavorites.index);
router.get('/bookings', BookingsController.index);
router.post('/bookings', BookingsController.create);
router.patch('/bookings/:id', BookingsController.update);
router.get('/bookings_status', async (req, res) => {
    try {
        const status = await knex('bookings_status')
        return res.json(status);
    } catch (error) {
        console.log(error)
    }
    
});

module.exports = router;
