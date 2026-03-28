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
        if (this.running >= this.limit || this.queue.length === 0) {
            return
        }

        const task = this.queue.shift();
        this.running++;
        try {
            await task();
        } catch (error) {

        }
        finally {
            this.running--;
            this.runNext();
        }

    }

}

const customTask = () => {
    setTimeout(() => {
        console.log('Hi');
    }, 1000);
}


const queue = new TaskQueue(1);


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
console.log(addFive(4));



function* fibonacci() {
    let [a, b] = [0, 1]
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}

const fib = fibonacci();
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);




