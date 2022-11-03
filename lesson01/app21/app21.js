const path = require('path');
const express = require("express");
require("dotenv").config();

const app = express(); //start server and shut down

//routing
app.get("/", function(req, res){
    console.log("GET received");
    res.status(200).send("Received your get request.");
});

app.get("/json", function(req, res){
    console.log("JSON GET received");
    res.status(200).send({"JSON Data": true});
});

app.get("/file", function(req, res){
    console.log("File GET received");

    res.status(200).sendFile(path.join(__dirname, "index.html"));
});

const server = app.listen(process.env.PORT, function(){

    //console.log(`Listening to port ${app.get('port')}..`);
    console.log(`${process.env.SERVER_LISTEN_MESSAGE} ${server.address().port}..`);

}); //stay awake and keep listening
