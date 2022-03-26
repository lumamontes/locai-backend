const express = require('express');
const imgur = require("imgur");
const fs = require("fs");

const knex = require('../../database/knex');
module.exports = {
    async index(request, response) {
        try {
            let properties = await knex.from('properties');
            return response.json(properties);
        } catch (error) {
            return response.json(error);
        }
    },
    async single_read(request, response) {
        try {
            const { id } = request.params;
            let properties = await knex.from('properties')
                .where({ id })

            return response.json(properties);
        } catch (error) {
            return response.json(error);
        }
    },
    async single_user(request, response) {
        try {
            const { user_id } = request.params;
            let properties = await knex.from('properties')
                .where({ user_id })
            return response.json(properties);
        } catch (error) {
            return response.json(error);
        }
    },
    async create(request, response, next) {
        const {
            property_type_id,
            user_id,
            ad_title,
            ad_description,
            ad_value,
            room_quantity,
            bathroom_quantity,
            property_adress,
            property_country,
            property_city,
            property_state,
            property_neighborhood,
            with_furniture,
            accepts_pets,
        } = request.body;
        let users = await knex.from('users')
            .where('id', user_id);
        if (users.length == 0) {
            return response.
                status(400)
                .json({
                    error: true,
                    message: 'Usuário inválido'
                });
        } else {
            try {
                const property = await knex('properties').insert({
                    property_type_id,
                    user_id,
                    ad_title,
                    ad_description,
                    ad_value,
                    room_quantity,
                    bathroom_quantity,
                    property_adress,
                    property_country,
                    property_neighborhood,
                    property_city,
                    property_state,
                    with_furniture,
                    accepts_pets,
                });
                // const property_id = property[0];

                // const url = await imgur.uploadFile(`./tmp/uploads/${request.file.filename}`);
                // await knex('files').insert({
                //     property_id: property_id,
                //     hash: url.link,
                // });
                // fs.unlinkSync(`./tmp/uploads/${request.file.filename}`);
                return response.status(201).json({
                    message: 'Cadastro com sucesso!'
                });

            } catch (error) {
                console.log(error)
            }

        }
    },
    async update(request, response, next) {
        try {
            const {
                property_type_id,
                user_id,
                ad_title,
                ad_description,
                ad_value,
                room_quantity,
                bathroom_quantity,
                property_adress,
                property_country,
                property_state,
                property_neighborhood,
                with_furniture,
                accepts_pets,
            } = request.body;
            const { id } = request.params;
            await knex('properties')
                .update(
                    {
                        property_type_id,
                        user_id,
                        ad_title,
                        ad_description,
                        ad_value,
                        room_quantity,
                        bathroom_quantity,
                        property_adress,
                        property_country,
                        property_state,
                        property_neighborhood,
                        with_furniture,
                        accepts_pets
                    })
                .where({ id });
            return response.send();
        } catch (error) {
            next(error)
        }
    },
    async delete(request, response, next) {
        try {
            const { id } = request.params;
            await knex('properties')
                .where({ id })
                .del()
            return response.send();
        } catch (error) {
            next(error)
        }
    }
}


