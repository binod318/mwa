const mongoose = require('mongoose');
require('./inspection-model');

mongoose.connect(process.env.DB_URL+process.env.DB_NAME);

mongoose.connection.on("connected", function(){
    console.log(process.env.MG_CONNECT_MSG);
})

mongoose.connection.on("disconnected", function(){
    console.log(process.env.MG_DISCONNECT_MSG);
})

mongoose.connection.on("error", function(){
    console.log(process.env.MG_ERROR_MSG); 
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        process.exit(0);
    })
})

process.on("SIGHUP", function(){
    mongoose.connection.close(function(){
        process.kill(process.pid, "SIGUSR2");
    })
})