const express = require('express');
require('dotenv').config();
const app = express();
const routes = require('./routes');

app.use("/", routes);

const server = app.listen(process.env.PORT, function(req, res){
    console.log(process.env.SERVER_LISTEN_MESSAGE, server.address().port);
});
