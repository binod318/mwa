const fs = require("fs");
const http = require("http");

const readIndexAndServe = function(req, res){

    //only start working after reading from file is complete
    fs.readFile(__dirname + "/index.html", function(err, buffer){
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(buffer);
    })

};

const server = http.createServer(readIndexAndServe);

server.listen(3434, "localhost", () => { //127.0.0.1
    console.log('Running at 3434');
});
