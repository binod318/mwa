const express = require('express');
require('dotenv').config();
require('./api/data/db');
const routes = require('./api/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', "GET,DELETE,POST,PUT,PATCH");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Preflight");
    next();
});

//routing
app.use('/api', routes);

port = process.env.PORT || 3000;

const server = app.listen(port, function(){
    console.log(process.env.SERVER_LISTENING_MESSAGE, server.address().port);
})
