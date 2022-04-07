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
    async create(request, response) {
        try {
            const {
                name,
                is_admin,
                is_realtor,
                email,
                telephone,
                birth_date,
                national_register,
                city,
                state,
                profile_picture,
                password
            } = request.body;

            let users = await knex.from('users').where({ email });

            if (users.length == 0) {
                let hashedPassword = await bcrypt.hash(password, 8);

                await knex('users').insert({
                    name,
                    is_admin,
                    is_realtor,
                    email,
                    telephone,
                    birth_date,
                    national_register,
                    city,
                    state,
                    profile_picture,
                    password: hashedPassword
                })
                return response.status(201).json(
                    {
                        message: 'Cadastro feito com sucesso! :)',
                        email,
                        password
                    }
                );
                ;
            } else {
                return response.
                    status(200)
                    .json({
                        error: true,
                        code: 'user.email_already_exists',
                        message: 'Já existe um usuário com esse e-mail cadastrado!'
                    });
            }

        } catch (error) {
            console.log(error)
        }
    },
    async sessions(request, response, next) {

        function generateJwtAndRefreshToken(email, payload = {}) {
            const token = jwt.sign(payload, 'supersecret', {
                subject: email,
                expiresIn: 60 * 60 * 60 * 60, // 15 minutes
            });
            const refreshToken = createRefreshToken(email, token)
            return {
                token,
                refreshToken,
            }
        }
        function createRefreshToken(email) {
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
                    code: 'user.not_found',                   
                    message: 'Não foi possível encontrar o usuário'
                });
        } else {
            for (user of users) {
                try {
                    if (await bcrypt.compare(password, user.password)) {

                        const { token, refreshToken } = generateJwtAndRefreshToken(email, {
                            user_id: user.id,
                            name: user.name,
                            is_admin: user.is_admin,
                            is_realtor: user.is_realtor
                        })
                        return response.
                            status(200)
                            .json({
                                id: user.id,
                                token,
                                refreshToken,
                                is_admin: user.is_admin,
                                is_realtor: user.is_realtor,
                                name: user.name
                            });
                    } else {
                        return response.
                            status(401)
                            .json({
                                error: true,
                                code: 'user.invalid_password',
                                message: 'Senha incorreta'
                            });
                    }
                } catch (err) {
                    next(err);
                }
            }
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            await knex('users')
                .where({ id })
                .del()
            return response.send();
        } catch (error) {
            next(error)
        }
    },
    async update(request, response, next) {
        try {
            const {
                is_admin,
                is_realtor,
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

            const { id } = request.params;
            await knex('users')
                .update(
                    {
                        is_admin,
                        is_realtor,
                        name,
                        email,
                        telephone,
                        birth_date,
                        national_register,
                        city,
                        state,
                        profile_picture,
                        password
                    })
                .where({ id });
            return response.send();
        } catch (error) {
            next(error)
        }
    },
}


