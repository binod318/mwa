const http = require("http");

const server = http.createServer();



server.listen(8080, "localhost", () => { //127.0.0.1
    console.log('Running at 8080');
});
