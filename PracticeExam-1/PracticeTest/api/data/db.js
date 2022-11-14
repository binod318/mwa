const mongoose = require('mongoose');
require('./job-schema');

mongoose.connect(process.env.DB_URL+process.env.DB_NAME);

mongoose.connection.on("connected", function(){
    console.log(process.env.MONGOOSE_CONNECTED_MSG);
})

mongoose.connection.on("disconnected", function(){
    console.log(process.env.MONGOOSE_DISCONNECTED_MSG);
})
    
mongoose.connection.on("error", function(){
    console.log(process.env.MONGOOSE_ERROR_MSG);
})