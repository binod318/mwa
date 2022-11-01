const fibonacci = function(n){
    let sign = 1;

    if(n < 0){
        sign = -1;
        n = -n;
    }

    if(n <= 2 )
        return sign * 1;
    else
        return sign * (fibonacci(n-1) + fibonacci(n-2));
}
console.log('Fibonacci of 33 is', fibonacci(33));
console.log('Fibonacci of -33 is', fibonacci(-33));