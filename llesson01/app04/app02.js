const fs = require('fs');

console.log('1. Get a file');

fs.readFile("largeFile.txt", function(err, buffer){
    console.log("2: Got the file ", buffer.toString().substring(0,21));
});

console.log("3. App continues");