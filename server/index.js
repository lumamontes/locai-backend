const express = require('express');
const cors = require('cors');
const passport = require("passport");
const imobbilesRoutes = require('./route/imobbilesRoute')
const imobbilesTypesRoute = require('./route/imobbilesTypesRoute')
const UsersRoute = require('./route/UsersRoute')

const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ["Content-Type", "Authorization"]);
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors({
        origin: "https://localhost:3000",
        credentials: true
    }));
    next();
});

function checkAuthMiddleware(request, response, next) {
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
      const decoded = jwt.verify(token, auth.secret);
  
      request.user = decoded.sub;
  
      return next();
    } catch (err) {
  
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
app.use(passport.initialize());
app.use(passport.session());
// require('./passportConfig')(passport);

app.use('/api', imobbilesRoutes);
app.use('/api', imobbilesTypesRoute);
app.use('/api', UsersRoute);
app.get('/me', checkAuthMiddleware, async (request, response) => {
    const email = request.user;
    console.log(email);
    let user = await knex.from('users')
    .where({ email })  
    if (!user) {
      return response
        .status(400)
        .json({ error: true, message: 'User not found.' });
    }
  
    return response.json({
      email,
      permissions: user.permissions,
      roles: user.roles,
    })
  });
  
  app.post('/refresh', addUserInformationToRequest, (request, response) => {
    const email = request.user;
    const { refreshToken } = request.body;
    
    const user = users.get(email);
    
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