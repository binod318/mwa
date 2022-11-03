const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.post("*", function(req, res){
    console.log('POST request received');
    res.status(process.env.OK_STATUS_CODE).json({"JSON_Response": true});
});

const server = app.listen(process.env.PORT, function(){
    console.log(process.env.SERVER_LISTEN_MESSAGE, server.address().port);
});