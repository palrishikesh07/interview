//What is function composition?
// Function composition combines two or more functions so that the output of one becomes the input of the next.
//  compose(f, g)(x) = f(g(x)). pipe() is left-to-right composition. 
// Used in functional programming to build complex logic from simple functions.



const composeExample = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x); 


const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x); 
const double = x => x * 2; 
const addOne = x => x + 1; 
const square = x => x * x; 
const transform = pipe(double, addOne, square); 
console.log(transform(3)); // ((3*2)+1)^2 = 49