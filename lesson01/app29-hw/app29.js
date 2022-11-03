const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes');

//for form data POST parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

//default routing for error message
app.use('*', function(req, res){
    res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).send(process.env.DEFAULT_MESSAGE);
});

const server = app.listen(process.env.PORT, function(req, res){
    console.log(process.env.SERVER_LISTEN_MESSAGE, server.address().port);
});
