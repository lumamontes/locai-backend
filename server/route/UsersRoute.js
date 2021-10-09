const express = require('express');
const router = express.Router();
const ImobbilesController = require('../controllers/UsersController');

router.get('/users/:id', ImobbilesController.index);
router.post('/users', ImobbilesController.create);

module.exports = router;