console.log("1 - start");

const laterWork = setTimeout(function(){
    console.log("2 - timeout");
    return 3;
}, 2000)

console.log(laterWork);

console.log("3 - end");

//////////////////


