const knex = require('../../database/knex');
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const passport = require("passport");
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
            // let password = hashedPassword;

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
            // let password = hashedPassword;

            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async sessions(request, response, next) {

        function generateJwtAndRefreshToken(email, payload = {}) {
            const token = jwt.sign(payload, 'supersecret', {
                subject: email,
                expiresIn: 5, // 15 minutes
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
        function checkRefreshTokenIsValid(email, refreshToken) {
            const storedRefreshTokens = tokens.get(email) ?? []

            return storedRefreshTokens.some(token => token == refreshToken)
        }

        function invalidateRefreshToken(email, refreshToken) {
            const storedRefreshTokens = tokens.get(email) ?? []

            tokens.set(email, storedRefreshTokens.filter(token => token !== refreshToken));
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
    // async addUserInformationToRequest(request, response, next) {
    //     const email = request.user;
    //     // const { refreshToken } = request.body;
    //     let user = await knex.from('users')
    //         .where({ email })
    //     if (!user) {
    //         return response.
    //             status(401)
    //             .json({
    //                 error: true,
    //                 message: 'Usuário não encontrado'
    //             });
    //     }

    //     const { token, refreshToken } = generateJwTandRefreshToken(email, {
    //         permissions: user.permissions,
    //     })

    //     return response.status(200).json({
    //         token,
    //         refreshToken,
    //         permissions: user.user_type_id,
    //     })

    // },
    // async checkAuthMiddlewareme(request, response, next) {
    //     const email = request.user;
    //         let user = knex.from('users')
    //         .where({ email })
    //          console.log(user);

    //         if (!user) {
    //             return response.
    //                 status(401)
    //                 .json({
    //                     error: true,
    //                     message: 'Usuário não encontrado'
    //                 });
    //         }
    //         return response.json({
    //             token,
    //             refreshToken,
    //             permissions: user.user_type_id,
    //         })

    // },
}


