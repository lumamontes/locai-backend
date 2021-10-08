const express = require('express');
const routes = require('./route/imobbilesRoute')

const app = express();

app.use(express.json());
app.use(routes);

app.use((error, req, res, next ) => {
    res.status(error.status || 500)
    res.json({error: error.message})
})

// app.use('/', require('./route/imobbilesRoute'));

app.listen(3000);