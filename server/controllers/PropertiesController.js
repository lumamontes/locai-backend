const express = require('express');
const imgur = require("imgur");
const fs = require("fs");
const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        try {
            if (Object.keys(request.query).length !== 0) {
            const keys = []
            const KeyValues = []
            for (const key in request.query) {
                if (request.query.hasOwnProperty.call(request.query, key)) {
                    const element = request.query[key];
                   if (element.length !== 0) {
                       keys.push(key)
                       KeyValues.push(element)
                   }
                }
            }
            if (KeyValues.length !== 0 ) {      
                const properties = await knex.from('properties').whereIn(
                 [keys], [KeyValues]
                )
                return response.json(properties);
            }
            let properties = await knex.from('properties');
            return response.json(properties);
        } else {
            let properties = await knex.from('properties');
            return response.json(properties);
        }
        } catch (error) {
            console.log(error)
            return response.json(error);
        }
    },
    async single_read(request, response) {
        try {
            const { id } = request.params;
            const property = await knex.select().from('properties').where({id}).first();
            const user = await knex.select('id', 'name', 'email', 'national_register', 'telephone').from('users').where('id', `${property.user_id}`);
            const files = await knex.select().from('files').where('property_id', id);
            response.json({
                    property, 
                    user, 
                    files
            })
        } catch (err) {
            console.log(err)
            return response.
                status(404)
                .json({
                    error: true,
                    code: 'property.invalid',
                    message: 'ímovel não encotrado'
                });
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
            category_id,
            user_id,
            ad_title,
            ad_description,
            ad_value,
            room_quantity,
            bathroom_quantity,
            garage_quantity,
            beds_quantity,
            property_adress,
            property_country,
            property_neighborhood,
            property_city,
            property_state,
            with_furniture,
            accepts_pets,
            year_constructed,
            property_area,
            land_area,
            files
        } = request.body;
        const firstFile = files.shift();
        let users = await knex.from('users')
            .where('id', user_id);
        if (users.length == 0) {
            return response.
                status(400)
                .json({
                    error: true,
                    code: 'user.invalid',
                    message: 'Usuário inválido'
                });
        } else {
            try {
                let teste = await knex('properties').insert({
                    property_type_id,
                    category_id,
                    user_id,
                    ad_title,
                    ad_description,
                    ad_value,
                    room_quantity,
                    bathroom_quantity,
                    garage_quantity,
                    beds_quantity,
                    property_adress,
                    property_country,
                    property_neighborhood,
                    property_city,
                    property_state,
                    with_furniture,
                    accepts_pets,
                    year_constructed,
                    property_area,
                    land_area,
                    ad_image: firstFile
                })
                    .returning('id')
                    .then(async id => {
                        for (file of files) {
                            try {
                                await knex('files').insert({
                                    property_id: id[0],
                                    url: file,
                                })
                            } catch (error) {
                                console.log(error)   
                            }
                        }
                        return response.status(201).json({
                            property_id: id[0],
                            message: 'Cadastro com sucesso!'
                        });
                    });
            } catch (error) {
                return response.json({
                    message: error.message,
                })
            }

        }
    },
    async update(request, response, next) {
        try {
            const {
                property_type_id,
                category_id,
                user_id,
                ad_title,
                ad_description,
                ad_value,
                room_quantity,
                bathroom_quantity,
                garage_quantity,
                beds_quantity,
                property_adress,
                property_country,
                property_neighborhood,
                property_city,
                property_state,
                with_furniture,
                accepts_pets,
                year_constructed,
                property_area,
                land_area
            } = request.body;
            const { id } = request.params;
            await knex('properties')
                .update(
                    {
                        property_type_id,
                        category_id,
                        user_id,
                        ad_title,
                        ad_description,
                        ad_value,
                        room_quantity,
                        bathroom_quantity,
                        garage_quantity,
                        beds_quantity,
                        property_adress,
                        property_country,
                        property_neighborhood,
                        property_city,
                        property_state,
                        with_furniture,
                        accepts_pets,
                        year_constructed,
                        property_area,
                        land_area
                    })
                .where({ id });
            return response.send();
        } catch (error) {
            console.log(error);
            return response.json({
                error: error.name,
                message: error.message,
            })
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


