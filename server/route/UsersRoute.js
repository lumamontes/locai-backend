const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const jwt = require('jsonwebtoken');
const knex = require('../../database/knex');
const decode = require('jwt-decode');
const tokens = []

function checkAuthMiddleware(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
    
    // const [token]   = authorization.split(' ');
    const token = request.headers.authorization.split(' ')[1];
    
    if (!token) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
    try {
        const decoded = jwt.verify(token, 'supersecret');
        request.user = decoded.sub;
        return next();
    } catch (err) {
        return response
            .status(401)
            .json({ error: true, code: 'token.expired', message: 'Sessão expirada. Realize login novamente! :)' })
    }
}

function addUserInformationToRequest(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }

    const [token] = authorization.split(' ');

    if (!token) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }


    try {
        const decoded = decode(token);

        request.user = decoded.sub;
        return next();
    } catch (err) {
        return response
            .status(401)
            .json({ error: true, code: 'token.invalid', message: 'Invalid token format.' })
    }
}

router.get('/users/:id', UsersController.index);
router.post('/users', UsersController.create);
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
            name: user.name,
            telephone: user.telephone,
            profile_picture: user.profile_picture,
            user_type_id: user.user_type_id,
        })
    }
});
router.get('/usertypes', UsersController.userTypes)

module.exports = router;