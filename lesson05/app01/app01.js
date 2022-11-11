const path = require('path');
const express = require("express");
require("dotenv").config();
require('./api/data/db');
const routes = require('./api/routes');

const app = express();

//for form data POST parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Preflight");
    next();
})

//express static server
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

const server = app.listen(process.env.PORT, function(){
    console.log(`${process.env.SERVER_LISTEN_MESSAGE} ${server.address().port}`);
});
