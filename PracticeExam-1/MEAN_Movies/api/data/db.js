const mongoose = require('mongoose');
require('./movies-model');

mongoose.connect(process.env.DB_URL+process.env.DB_NAME);

mongoose.connection.on("connected", function(){
    console.log(process.env.MONGOOSE_CONNECTED_MESSAGE);
});

mongoose.connection.on("disconnected", function(){
    console.log(process.env.MONGOOSE_DISCONNECTED_MESSAGE);
})

mongoose.connection.on("error", function(){
    console.log(process.env.MONGOOSE_ERROR_MESSAGE);
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        process.exit(0);
    });
})

process.on('SIGHUP', function(){
    mongoose.connection.close(function(){
        process.kill(process.pid, "SIGUSR2");
    })
})