const child_process = require("child_process");

console.log("1-start");

//require("./fibonacci"); // i/o blocking

const newProcess = 
    child_process.spawn("node", ["fibonacci.js"], {stdio: "inherit"}); // i/o non blocking

console.log("3-end");
