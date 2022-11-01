const fs = require("fs");
const http = require("http");

const helloWorld = function(req, res){
    res.writeHead(200);
    res.end("Hello world");
}

const serveIndex = function(req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    const buffer = fs.readFileSync('./index.html');
    res.end(buffer);
}

const server = http.createServer(serveIndex);

server.listen(3434, "localhost", () => { //127.0.0.1
    console.log('Running at 3434');
});

