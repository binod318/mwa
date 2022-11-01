const fs = require("fs");
const http = require("http");

const serveAllRequest = function(req, res){

    let statusCode = 200;

    //all get methods
    if(req.method === "GET"){
        res.setHeader("Content-Type", "text/html");

        switch(req.url){
            case "/":
                fs.readFile(__dirname + "/index.html", function(err, buffer){
                    if(err){
                        statusCode = 404;
                        buffer = "File not found!";
                    } 

                    res.writeHead(statusCode);
                    res.end(buffer);
                });
                break;
            default:
                fs.readFile(__dirname + req.url, function(err, buffer){
                    if(err){
                        statusCode = 404;
                        buffer = "File not found!";
                    } 
                    
                    res.writeHead(statusCode);
                    res.end(buffer);
                });
                break;
        }

    } else { //POST methods
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.end("{'message': 'This is the JSON Response.'}");
    }

}

const server = http.createServer(serveAllRequest);

server.listen(3434, "localhost", function(){
    console.log("Server is listening to 3434 port..");
})
