class TaskQueue {
    constructor(limit) {
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    }

    enqueue(task) {
        this.queue.push(task);
        this.runNext();
    }

    async runNext() {
        while (this.running < this.limit && this.queue.length > 0) {
            const task = this.queue.shift();
            this.running++; // Increment running count before executing the task

            task()
                .catch(console.error)
                .finally(() => {
                    this.running--;
                    this.runNext();
                });
        }
    }

}


const customTask = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Hi');
            resolve();
        }, 1000);
    });
};

const queue = new TaskQueue(3);


queue.enqueue(customTask);
queue.enqueue(customTask);
queue.enqueue(customTask);
queue.enqueue(customTask);


function add(a) {
    return function (b) {
        return a + b;
    }
}

const addFive = add(5);
// console.log(addFive(4));



function* fibonacci() {
    let [a, b] = [0, 1]
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}

const fib = fibonacci();
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);




