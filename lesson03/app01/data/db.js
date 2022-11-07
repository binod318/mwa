const mongoose = require('mongoose');
require('./games-model');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(){
    console.log("Mongoose connection error");
});

process.on("SIGINT", function(){
    console.log("Interrupt received");
    mongoose.connection.close(function(){
        console.log("Mongoose close success.");
        process.exit(0);
    });
    // both works
    // mongoose.disconnect(function(){
    //     console.log("Mongoose close success.");
    //     process.exit(0);
    // });
});

process.on("SIGTERM", function(){
    console.log("Terminate received");
    mongoose.connection.close(function(){
        console.log("Mongoose close success.");
        process.exit(0);
    });
    // both works
    // mongoose.disconnect(function(){
    //     console.log("Mongoose close success.");
    //     process.exit(0);
    // });
});

process.once("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app restart.");
        process.kill(process.pid, "SIGUSR2");
    });
})

process.on("SIGHUP", function(){
    mongoose.connection.close(function(){
        process.kill(process.pid, "SIGUSR2");
    });
});