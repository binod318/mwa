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

process.on("SIGUSR2", function(){
    console.log("Restart received");
    mongoose.connection.close(function(){
        console.log("Mongoose close success.....a.");
        //process.exit(0);
        process.kill(process.pid, "SIGUSR2");
    });
});
process.on("SIGUSR1", function(){
    console.log("SIGUSR1 received");
    mongoose.connection.close(function(){
        console.log("Mongoose close success..dff...a.");
        //process.exit(0);
        process.kill(process.pid, "SIGUSR1");
    });
});

// process.on("SIGHUP", function(){
//     console.log("SIGHUP received");
//     mongoose.connection.close(function(){
//         console.log("Mongoose close success..dffdd...a.YXXXX");
//         //process.exit(0);
//         process.kill(process.pid, "SIGUSR2");
//     });
// });