const fileName = "index.js";

const hello = function(name){
    console.log("Hello ", name);
}

const intro = function(name){
    console.log("I'm a node file called ", fileName);
}

module.exports = {
    greeting: hello,
    intro
}

