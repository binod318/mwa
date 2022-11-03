const path = require('path');
const express = require("express");
require("dotenv").config();

const app = express();

// /css -> subset route
app.use("/css", function(req, res, next){
    console.log(req.method, req.url);
    next();
});

app.get("/json", function(req, res){
    console.log("JSON GET received");
    res.status(parseInt(process.env.OK_STATUS_CODE)).send({"JSON Data": true});
});

//express static server
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function(){
    console.log(`${process.env.SERVER_LISTEN_MESSAGE} ${server.address().port}..`);
});
