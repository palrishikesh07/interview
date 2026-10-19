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

function counter(){
    let count = 0;
    return {
        increment:function(){
            count++;
            console.log(count);
        },
        decrement: function(){
            count--;
            console.log(count);
        }
    }
}

countNumber = counter();
countNumber.increment();
countNumber.increment();
countNumber.increment();
countNumber.decrement();