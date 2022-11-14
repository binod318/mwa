const express = require('express');
require('dotenv').config();
require('./api/data/db');
const routes = require('./api/routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', function(req, res, next){
    
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,PATCH');
    
    next();
})

app.use('/api', routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, function(){
    console.log(process.env.SERVER_LISTENING_MSG, server.address().port);
}); 
