const counterModule = (function () {
    // private variable
    let count = 0;
    // private method

    function logCount() {
        console.log(`Log count is : ${count}`);
    }
    return {
        increment() {
            count++;
            logCount();
        },
        decrement() {
            count--;
            logCount();
        }
    }

})()


counterModule.increment()
counterModule.increment()
counterModule.increment()
counterModule.decrement()
counterModule.decrement()
counterModule.decrement()
counterModule.decrement()