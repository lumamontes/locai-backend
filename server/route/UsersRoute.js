const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/users/:id', UsersController.index);
router.post('/users', UsersController.create);
router.post('/login', UsersController.sessions);
router.post('/refresh', UsersController.addUserInformationToRequest);
router.get('/me', UsersController.me);

module.exports = router;