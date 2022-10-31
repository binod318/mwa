require('./instantHello');

let talk = require('./talk'); //donot use .js

const question = require("./talk/question")

talk.greeting("Jasmin");
talk.intro();

const answer = question.ask("What is the meaning of life?");
console.log(answer);
