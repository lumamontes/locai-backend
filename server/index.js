const express = require('express');
const cors = require('cors');
const passport = require("passport");
const imobbilesRoutes = require('./route/imobbilesRoute')
const imobbilesTypesRoute = require('./route/imobbilesTypesRoute')
const UsersRoute = require('./route/UsersRoute')
const jwt = require('jsonwebtoken');
const knex = require('../database/knex');

const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    res.header ("Access-Control-Expose-Headers", "Content-Length, X-JSON");
    app.use(cors({
        origin: "https://localhost:3000",
        credentials: true
    }));
    return next();
  });

function checkAuthMiddleware(request, response, next) {
    const { authorization } = request.headers;
    console.log(authorization);
    if (!authorization) {
      return response
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
    
    const [, token] = authorization?.split(' ');
    
    if (!token) {
      return response 
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
    try {
      const decoded = jwt.verify(token, 'supersecret');
  
      request.user = decoded.sub;
      return next();
    } catch (err) {
      console.log(err)
      return response 
        .status(401)
        .json({  error: true, code: 'token.expired', message: 'Token invalid.' })
    }
  }
  
  function addUserInformationToRequest(request, response, next) {
    const { authorization } = request.headers;
  
    if (!authorization) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
  
    const [, token] = authorization?.split(' ');
  
    if (!token) {
      return response 
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }
  
    try {
      const decoded = decode(token);
  
      request.user = decoded.sub;
  
      return next();
    } catch (err) {
      return response 
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Invalid token format.' })
    }
  }

app.use(session({
    secret: "secretcode",
    resave:true,
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
app.get('/api/me', checkAuthMiddleware, async (request, response) => {
    const email = request.user;
    let users = await knex.from('users')
    .where({ email })  
    for (user of users) {
    if (!user) {
      return response
      .status(400)
      .json({ error: true, message: 'User not found.' });
    }
    
      return response.status(200).json({
        email,
        user_type_id: user.user_type_id,
      })
    }
  });
  
  app.post('/refresh', addUserInformationToRequest, async (request, response) => {
    const email = request.user;
    const { refreshToken } = request.body;
    let user = await knex.from('users')
    .where({ email })  
    
    if (!user) {
      return response
        .status(401)
        .json({ 
          error: true, 
          message: 'User not found.'
        });
      }
      
      if (!refreshToken) {
        return response
        .status(401)
        .json({ error: true, message: 'Refresh token is required.' });
    }
    
    const isValidRefreshToken = checkRefreshTokenIsValid(email, refreshToken)
    
    if (!isValidRefreshToken) {
      return response
      .status(401)
      .json({ error: true, message: 'Refresh token is invalid.' });
    }
    
    invalidateRefreshToken(email, refreshToken)
    
    const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(email, {
      permissions: user.permissions,
      roles: user.roles,
    })
  
    return response.json({
      token,
      refreshToken: newRefreshToken,
      permissions: user.permissions,
      roles: user.roles,
    });
  });
  
  //not Found                          
  app.use((req, res, next ) => {
      const error = new Error('Not found');
      error.status = 404
      next(error);
  })
  
  
  // catch all
app.use((error, req, res, next ) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})


app.listen(3333);