//A Task Scheduler is a system that manages and executes tasks based on a schedule, priority, or available resources.




class TaskSchedulerBasic{
    constructor(){
        this.tasks=[];
    }

    addTask(task){
        this.tasks.push(task);
    }

    run(){
        while(this.tasks.length > 0){
            const task = this.tasks.shift();
            task();
        }
    }
}


const schedulerBasic = new TaskSchedulerBasic();
schedulerBasic.addTask(()=>console.log("Basic Task 1"));
schedulerBasic.addTask(()=>console.log("Basic Task 2"));
schedulerBasic.addTask(()=>console.log("Basic Task 3"));

schedulerBasic.run();



class TaskScheduler {
    constructor(concurrency) { // limit
        this.concurrency = Number(concurrency);
        this.runningTask = 0;
        this.__waitingQueue = [];
    }

    getNextTask() {
        if (this.runningTask < this.concurrency && this.__waitingQueue.length > 0) {
            const nextTask = this.__waitingQueue.shift();
            nextTask();
        }
    }


    addTask(task) {
        return new Promise((resolve, reject) => {
            // fun creation
            async function __taskRunner() {
                // Managing state
                this.runningTask += 1;
                try {
                    const result = await task();
                    console.log(`Result `, result);
                    resolve(result)
                }
                catch (err) {
                    console.log(`Task Failed`, err);
                    reject(err)
                }
                finally {
                    this.runningTask -= 1;
                    // See if there is more task in queue
                    this.getNextTask();
                }
            }
            // To run the task
            if (this.runningTask < this.concurrency) {
                __taskRunner.call(this);
            }
            else {
                console.log(`Waiting qeue: `, task);

                this.__waitingQueue.push(__taskRunner.bind(this));
            }
        })
    }
}

const scheduler = new TaskScheduler(2);

scheduler.addTask(() => new Promise((res) => setTimeout(() => {
    res('Task 1')
}, 1000)))
scheduler.addTask(() => new Promise((res) => setTimeout(() => {
    res('Task 2')
}, 500)))
scheduler.addTask(() => new Promise((res) => setTimeout(() => {
    res('Task 3')
}, 100)))


