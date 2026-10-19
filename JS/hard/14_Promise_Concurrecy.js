
async function processTasks(tasks, concurrency) {
    if (!Number.isInteger(concurrency) || concurrency < 1) {
        throw new Error("Concurrency must be a positive integer");
    }

    const result = new Array(tasks.length);
    let nextIndex = 0;

    async function worker() {

        if (nextIndex > tasks.length - 1) return true; // If index react to last value

        const currentIndex = nextIndex++;

        try {
            const value = await tasks[currentIndex]()
            result[currentIndex] = { status: "fulfilled", value };
        } catch (error) {
            result[currentIndex] = { status: "rejected", reason: error instanceof Error ? error.message : "err" };
        }

        // CHANGE: Pick up the next task immediately
        return worker();
    }


    for (let i = 0; i < tasks.length; i = i + concurrency) {

        const workers = Array.from({ length: concurrency }, () => worker());
        await Promise.all(workers);
    }

    return result;

}

// Helper function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sample tasks
const tasks = [
    async () => {
        await delay(1000);
        return "Task 1 success";
    },
    async () => {
        await delay(500);
        throw new Error("Task 2 failed");
    },
    async () => {
        await delay(800);
        return "Task 3 success";
    },
    async () => {
        await delay(300);
        throw new Error("Task 4 failed");
    },
    async () => {
        await delay(400);
        return "Task 5 success";
    }
];

// Run with a concurrency limit of 2
processTasks(tasks, 2)
    .then(results => console.log(results))
    .catch(error => console.error(error));
