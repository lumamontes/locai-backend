const express = require('express');
// const imobbilesRoutes = require('./route/imobbilesRoute')
const route = require('./route/UsersRoute')
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    //console.log("Acessou o Middleware!");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

// app.use('/api', imobbilesRoutes);
app.use('/api', route);



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