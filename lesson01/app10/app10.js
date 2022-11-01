const fs = require("fs");
const http = require("http");

const helloWorld = function(req, res){
    res.writeHead(200);
    res.end("Hello world");
}

const helloWorldHtml = function(req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><title>Page</title><body><h1>Hello World!</h1><body></html>`);
}

const serveIndex = function(req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    const buffer = fs.readFileSync('index.html'); //('./index.html)
    res.end(buffer);
}

//const server = http.createServer(helloWorld);
//const server = http.createServer(helloWorldHtml);
const server = http.createServer(serveIndex);

server.listen(4444, "localhost", () => { //127.0.0.1
    console.log('Running at 4444');
});
