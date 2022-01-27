# projeti-home-backend

API para o Projeti da a faculdade Meta com o objetivo de desenvolver uma plataforma de anúncio de apartamentos e casas para alugar.

Ferramentas: Node.JS com o QueryBuilder Knex.js para MySQL

Rotas:

Properties
- api/get/properties
- api/get/properties/:id
- api/get/properties_user/:user_id
- api/post/properties/
- api/put/properties/:id
- api/delete/properties/:id

Users
- api/get/users/:id
- api/post/users
- api/post/login
- api/post/refresh
- api/get/me

Properties_types

- api/get/properties_types

Documentação completa:
https://tender-yalow-070959.netlify.app/
## Como executar 

Para iniciá-lo, siga os passos abaixo:
```bash
# Instalar as dependências
$ yarn

Localmente:

#Crie um banco de dados MySQL localmente e coloque as informações de conexão no arquivo knexfile.js
 $  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
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

