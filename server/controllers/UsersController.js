const knex = require('../../database/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid').v4;
const tokens = []

module.exports = {

    async index(request, response) {
        try {
            const { id } = request.params;
            let users = await knex.from('users')
                .where({ id })

            return response.json(users);
        } catch (error) {
            return response.json(error);
        }
    },
    async create(request, response, next) {
        try {
            const {
                user_type_id,
                name,
                email,
                telephone,
                birth_date,
                national_register,
                city,
                state,
                profile_picture,
                password
            } = request.body;

            let hashedPassword = await bcrypt.hash(password, 8);

            await knex('users').insert({
                user_type_id,
                name,
                email,
                telephone,
                birth_date,
                national_register,
                city,
                state,
                profile_picture,
                password: hashedPassword
            });

            return response.status(201).send();
        } catch (error) {
            return response.send('error')
        }
    },
    async sessions(request, response, next) {

        function generateJwtAndRefreshToken(email, payload = {}) {
            const token = jwt.sign(payload, 'supersecret', {
                subject: email,
                expiresIn: 60 * 60 * 24 * 30, // 15 minutes
            });
            const refreshToken = createRefreshToken(email, token)
            return {
                token,
                refreshToken,
            }
        }
        function createRefreshToken(email, token) {
            const currentUserTokens = [];
            const refreshToken = uuid();
            tokens.push(email, [...currentUserTokens, refreshToken])
            return refreshToken;
        }

        const {
            email,
            password
        } = request.body;
        let users = await knex.from('users')
            .where({ email })
        if (users.length == 0) {
            return response.
                status(401)
                .json({
                    error: true,
                    message: 'Não foi possível encontrar o usuário'
                });
        } else {
            for (user of users) {
                try {
                    if (await bcrypt.compare(password, user.password)) {

                        const { token, refreshToken } = generateJwtAndRefreshToken(email, {
                            permissions: user.permissions,
                        })
                        return response.json({
                            token,
                            refreshToken,
                            user_type_id: user.user_type_id,
                            name: user.name,
                            telephone: user.telephone
                        })
                    } else {
                        return response.
                            status(401)
                            .json({
                                error: true,
                                message: 'Senha incorreta'
                            });
                    }
                } catch (err) {
                    console.log(err);
                    next(err);
                }
            }
        }
    },

    async userTypes(req,res){
       try {
        const userTypes = await knex.from('user_types')
         res.status(201).json(userTypes)
       } catch (error) {
           console.log(error)
       }
    }
    
}


