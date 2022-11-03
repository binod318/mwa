const path = require('path');
const express = require("express");
require("dotenv").config();
const routes = require('./routes');

const app = express();

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

//express static server
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

const server = app.listen(process.env.PORT, function(){
    console.log(`${process.env.SERVER_LISTEN_MESSAGE} ${server.address().port}..`);
});
