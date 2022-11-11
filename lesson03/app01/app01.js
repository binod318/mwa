const path = require('path');
const express = require("express");
require("dotenv").config();
require('./data/db');
const routes = require('./routes');

const app = express();

//for form data POST parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-COntrol-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//express static server
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

const server = app.listen(process.env.PORT, function(){
    console.log(`${process.env.SERVER_LISTEN_MESSAGE} ${server.address().port}`);
});
