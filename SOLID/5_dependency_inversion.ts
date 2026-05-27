// High-level modules should depend on abstractions, not concrete implementations.
// Depend on abstractions, not concrete classes.

// ❌ Bad Example
class MySQLDatabase {
    connect() {
        console.log("Connecting to MySQL database...");
    }
}

class UserService{
    db = new MySQLDatabase();
}

// Problem
// Tightly coupled.
// Switching DB becomes difficult.

// ✅ Good Example
// Abstraction
interface Database {
    connect(): void;
}

// Concrete Implementation (Mysql Implementation)
class MySQLDatabase implements Database {
    connect() {
        console.log("Connecting to MySQL database...");
    }
}

// Concrete Implementation (MongoDB Implementation)
class MongoDBDatabase implements Database {
    connect() {
        console.log("Connecting to MongoDB database...");
    }
}

// High-level module depends on abstraction
class UserService {
    constructor(private db: Database) {}
    start(){
        this.db.connect();
    }
}

//Usage
const service = new UserService(new MySQLDatabase());
service.start();

// Benefits
// - Decoupled code.
// - Easier to switch implementations (e.g., MySQL to MongoDB).
// - Improved testability (can mock Database interface).