const fs = require("fs");
const http = require("http");
let indexBuffer;

const serveIndex = function(req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexBuffer);
};

fs.readFile(__dirname + "/index.html", function(err, buffer){
    indexBuffer = buffer;

    //start listening to server only after the file read is complete
    server.listen(3434, "localhost", function(){
        console.log("Server running on 3434 port..");
    });
});

const server = http.createServer(serveIndex);
