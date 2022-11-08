import { DE_Student } from "./DE_Students";

let jack:DE_Student = new DE_Student(123, "Jack", 3.0);

console.log(jack.id);
console.log(jack.getName());
console.log(jack.gpa);

console.log(jack['course']);
console.log("Can yo program?", jack['canProgram']);

if(jack['canProgram']){
    jack['program']();
} else {
    console.log(jack.getName(), "don't worry about");
    
}


