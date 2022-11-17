const promise1 = new Promise((resolve, reject) => resolve());
const promise2 = new Promise((resolve, reject) => reject());

promise1.then(function(){
            console.log("Looks good");
        }).catch(function(){
            console.log("Failed");
        }).finally(function(){
            console.log("Finally");
        });

promise2.then(function(){
            console.log("Looks good2");
        }).catch(function(){
            console.log("Failed2");
        }).finally(function(){
            console.log("Finally2");
        });