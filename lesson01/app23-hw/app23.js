const path = require("path");
const express = require("express");
require("dotenv").config();
const routes = require("./routes");

const app = express();

//express static server
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

const server = app.listen(process.env.PORT, function(){
    console.log(process.env.SERVER_LISTEN_MESSAGE, server.address().port);
});
