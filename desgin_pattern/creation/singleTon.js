// It makes sure that the class acts as a single source of entry for all the consumer components that want to access this state.
// In other words, it provides a common entry point for using global state.

// Normal Code snipet

const mongoose = require("mongoose");

function connectToDB() {
    return mongoose.connect('mongodb://localhost:27017/mydb');
}

module.exports = { connectToDB }

// Issue: Each time you require this module, the connectToDB function is re-executed, potentially creating multiple database connections. 
// Risk: Multiple connections can lead to resource exhaustion, performance issues, or errors. 


// Singleton Pattern


const mongooseV2 = require("mongoose");

class Database {
    static instance = null;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        this.connection = mongooseV2.connect('mongodb://localhost:27017/mydb');
        Database.instance = this;
    }

    getConnection() {
        return this.connection;
    }
}

// module.exports = Database;

const db1 = new Database();
const db2 = new Database();

console.log(db1);
console.log(db2);
console.log(db1 === db2); // true