const express = require('express');
require('dotenv').config();
require('./api/data/db')
const routes = require('./api/routes');
const app= express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//CORS
app.use('/api', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Preflight");
    
    next();
})

//route
app.use('/api', routes);

const server = app.listen(port, function(){
    console.log(process.env.SERVER_LISTEN_MESSAGE,server.address().port)
});
