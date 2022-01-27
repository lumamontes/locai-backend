-- yarn add express mysql dotenv cors body-parser
create database dbprojetiv2;
-- use dbprojetiv2;


CREATE TABLE `files` (
  `id` int auto_increment not null,
  `property_id` int,
  `hash` varchar(150),
  `updated_at` timestamp,
  `created_at` timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE `properties` (
  `id` int auto_increment not NULL,
  `property_type_id` int,
  `user_id` int,
  `room_quantity` float,
  `bathroom_quantity` float,
  `property_adress` varchar(150),
  `property_country` varchar(150),
  `property_city` varchar(150),
  `property_state` varchar(150),
  `ad_description` varchar(150),
  `ad_value` float,
  `ad_title` varchar(150),
  `acept_pets` boolean,
  `with_furniture` boolean,
 `updated_at` timestamp,
  `created_at` timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (property_type_id) REFERENCES properties_types(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE `properties_types` (
  `id` int primary key auto_increment not null,
  `name`  varchar(80),
  `updated_at` timestamp,
  `created_at` timestamp
);

CREATE TABLE `amenities` (
  `id` int auto_increment not null,
  `property_id` int,
  `name` varchar(80),
  `description` varchar(80),
  `active` boolean,
  `updated_at` timestamp,
  `created_at` timestamp,
  PRIMARY KEY (id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE `users` (
  `id` int primary key auto_increment not null,
  `user_type_id` int,
  `name` varchar(80),
  `email` varchar(80),
  `telephone` varchar(80),
  `birth_date` date,
  `national_register` float(14),
  `city` varchar(80),
  `state` varchar(80),
  `profile_picture` varchar(80),
  `password` varchar(150),
  `updated_at` timestamp,
  `created_at` timestamp
   FOREIGN KEY (user_type_id) REFERENCES user_types(id)

);

CREATE TABLE `user_types` (
  `id` int primary key auto_increment not null,
  `name`  varchar(80),
  `updated_at` timestamp,
  `created_at` timestamp
);

user_Type = 1 - user 
user_Type = 2 - anuncios 
user_Type = 3 - corretor 


create table usuarios(id int primary key auto_increment, nome varchar(80),
 data_nascimento date, cadastro_nacional float, email varchar(30) ,  cidade varchar(30), 
estado varchar(50),
 created_at timestamp, 
 updtated_at timestamp); 




$ knex migrate:up 001_migration_name.js
/home/luma/www/projeti-home-backend/database/migrations/
