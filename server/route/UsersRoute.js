const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const knex = require('../../database/knex');

const validate = require('../Middlewares/validationMiddleware');
const userSchema = require('../../Validations/userValidation');

const checkAuthMiddleware = require('../Middlewares/checkAuthMiddleware');


router.get('/users/:id', UsersController.index);
router.post('/users',validate(userSchema), UsersController.create);
router.post('/login', UsersController.sessions);
router.get('/me', checkAuthMiddleware, async (request, response) => {
    const email = request.user;
    let users = await knex.from('users')
        .where({ email })
    for (user of users) {
        if (!user) {
            return response
                .status(400)
                .json({ error: true, message: 'User not found.' });
        }

        return response.status(200).json({
            email,
            id: user.id,
            name: user.name,
            telephone: user.telephone,
            profile_picture: user.profile_picture,
            user_type_id: user.user_type_id,
        })
    }
});
router.get('/usertypes', UsersController.userTypes)

module.exports = router;