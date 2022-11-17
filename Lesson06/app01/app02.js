function resolvePromise2s (){
    return new Promise(resolve => setTimeout(()=>{
        resolve("Done in 2 seconds");
    }, 2000));
}

async function myFunction(){
    console.log("Start async");
    const promiseResult = await resolvePromise2s()();
    console.log(promiseResult);
    console.log("End async");
}

console.log('start');
myFunction();
console.log('end');