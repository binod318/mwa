const randomPromise = new Promise((resolve, reject) =>{
    let num=Math.random();
    setTimeout(() =>{
        if(num > 0.5){
            resolve(num);
        } else {
            reject("Number too low");
        }
    }, 2000);
})

////////////////

const successPromise = new Promise((resolve, reject) =>{
    let num=Math.random();
    setTimeout(() =>{
        if(num > 0.5){
            resolve(num);
        } else {
            reject("Number too low for success");
        }
    }, 3000);
})

const failPromise = new Promise((resolve, reject) =>{
    let num=Math.random();
    setTimeout(() =>{
        if(num > 0.5){
            resolve(num);
        } else {
            reject("Number too low so we failed");
        }
    }, 5000);
})

console.log("randomPromise is", randomPromise);

// randomPromise.then((data)=>{
//     console.log("Number is", data);
//     console.log(randomPromise);
// }).catch((errorMessage)=> {
//     console.log(errorMessage);
//     console.log(randomPromise);
// })


// Promise.all([randomPromise, successPromise, failPromise])
//     .then(value => {
//         console.log("All good", value);
//     })
//     .catch(err => {
//         console.log("All bad", err);
//     })

//console.log("randomPromise is", randomPromise);
        
        
        
Promise.race([randomPromise, successPromise, failPromise])
    .then(value => {
        console.log("All good", value);
    })
    .catch(err => {
        console.log("All bad", err);
    })

successPromise.then(function(){
    
})