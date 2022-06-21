# LOCAÍ

![image](https://user-images.githubusercontent.com/60052718/174868308-e2d96b60-5cb6-4915-8259-d2845d6de27c.png)


API para plataforma LOCAÍ, desenvolvida para trabalho de conclusão de curso da faculdade Meta com o objetivo de anunciar imóveis para alugar.

Ferramentas: Node.JS com o QueryBuilder Knex.js para PostgreSQL

Endpoints:

- Properties
- Properties_types
- Properties_categories
- Users
- Bookings
- BookingsStatus
- UserFavorites

Documentação completa: http://www.locai-api.netlify.app <br>
Insomnia: https://drive.google.com/file/d/1lxCU-uRikFdE4BB8hASGECEQRVsRj9s1/view?usp=sharing

## Como executar 

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ yarn

Localmente:

#Crie um banco de dados postgreSQL localmente e coloque as informações de conexão no arquivo knexfile.js
 $  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      port : your_database_port,
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test',
      charset: 'utf8'
    },

#Rode as migrations para fazer a criação das tabelas no seu banco de dados local através do comando abaixo:

$ npx knex migrate:latest
ou
$ knex migrate:latest

#Rode o seeder para realizar a inserção de dados inicias no seu banco de dados local
$ npx knex seed:run
ou 
$knex seed:run

# Iniciar o projeto
$ yarn start

```

