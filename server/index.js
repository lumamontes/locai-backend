const express = require('express');
const cors = require('cors');
const passport = require("passport");
const imobbilesRoutes = require('./route/imobbilesRoute')
const imobbilesTypesRoute = require('./route/imobbilesTypesRoute')
const UsersRoute = require('./route/UsersRoute')
const filesRoute = require('./route/filesRoute')
const jwt = require('jsonwebtoken');
const knex = require('../database/knex');
const decode = require('jwt-decode');
const tokens = []

const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
  res.header("Access-Control-Expose-Headers", "Content-Length, X-JSON");
  app.use(cors());
  return next();
});


app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("secredcode"))
// app.use(passport.initialize());

// app.use(passport.session());
// require('./passportConfig')(passport);
app.options('*', cors())
app.use('/api', imobbilesRoutes);
app.use('/api', imobbilesTypesRoute);
app.use('/api', UsersRoute);
app.use('/api', filesRoute);

app.get('/status', (req,res)=>{
  res.status(200).json({
    message:"Serviço rodando"
  })
})

//not Found                          
app.use((req, res, next) => {
  const error = new Error('Rota não encontrada');
  error.status = 404
  next(error);
})


// catch all
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})


app.listen(8080, ()=>{
  console.log('Serviço rodando ')
});