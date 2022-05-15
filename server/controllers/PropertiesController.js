const express = require('express');
const imgur = require("imgur");
const fs = require("fs");
const knex = require('../../database/knex');

module.exports = {
    async index(request, response) {
        try {
            if (Object.keys(request.query).length !== 0 && Object.values(request.query).length !== 0) {
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
                if (keys.length !== 0) {
                    const properties = await knex.from('properties').whereIn(
                        keys, [KeyValues]
                    )
                    return response.json(properties);
                } else {
                    let properties = await knex.from('properties');
                    return response.json(properties);
                }
            } else {
                let properties = await knex.from('properties');
                return response.json(properties);
            }
        } catch (error) {
            return response.json(error);
        }
    },
    async single_read(request, response) {
        try {
            const { id } = request.params;
            await knex.select()
                .from('properties').where({ id })
                .then(async function (properties) {
                    await knex.select('url')
                        .from('files').where('property_id', id)
                        .then(function (files) {
                            response.json({
                                property: properties,
                                files: files,
                            });
                        });
                }).catch(function (error) {
                    return response.
                        status(404)
                        .json({
                            error: true,
                            code: 'property.invalid',
                            message: 'ímovel não encotrado'
                        });
                });
        } catch (err) {
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
            land_area
        } = request.body;
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
                const files = request.files
                const firstFile = files.length > 0 ? request.files?.shift() : [] 
                if(firstFile.length > 0){
                    url = await imgur.uploadFile(`./tmp/uploads/${firstFile.filename}`);
                }
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
                    ad_image: firstFile.length > 0 ? url.link : null 
                })
                    .returning('id')
                    .then(async id => {
                        for (let i = 0; i < files.length; i++) {
                            try {
                                const url = await imgur.uploadFile(`./tmp/uploads/${files[i].filename}`);
                                await knex('files').insert({
                                    property_id: id[0],
                                    url: url.link,
                                })
                                fs.unlinkSync(`./tmp/uploads/${files[i].filename}`);
                            } catch (error) {
                                return response.status(400).json({
                                    message: error.message,
                                });
                            }
                        }
                        if(firstFile.length > 0){
                            fs.unlinkSync(`./tmp/uploads/${firstFile.filename}`);
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


