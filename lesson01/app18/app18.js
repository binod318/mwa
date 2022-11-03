const express = require("express");

const app = express(); //start server and shut down

app.set("port", 3000);

const server = app.listen(app.get('port'), function(){

    //console.log(`Listening to port ${app.get('port')}..`);
    console.log(`Listening to port ${server.address().port}..`);

}); //stay awake and keep listening
