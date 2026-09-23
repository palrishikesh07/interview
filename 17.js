// find output

function outer() {
    var x = 1;
    function inner() {
        console.log(x);
    }
    x = 2;
    return inner;
}
const result = outer();
result(); // 2