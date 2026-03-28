// “This code implements the Singleton pattern by ensuring only one Logger instance is created and reused across the application.”
class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        this.logs = [];
        Logger.instance = this;
    }

    log(message) {
        this.logs.push(message);
        console.log('Log: ', message);
    }
}

const logger1 = new Logger();
const logger2 = new Logger();

logger1.log("First Message");
logger2.log("Second Message");

console.log("True: ", logger1 === logger2);
