
// Clients should not be forced to implement methods they don't use.
// Keep interfaces small and specific.

//❌ Bad Example

interface Worker{
    work(): void;
    eat(): void;
}

class Robot implements Worker{
    work(){
        console.log("Robot is working");
    }
    eat(){
        throw new Error("Robot doesn't eat");
    }
}

// Problem
// Robot doesn't eat.

// ✅ Good Example

interface IWorkable{
    work(): void;
}

interface IFeedable{
    eat(): void;
}

class Human implements IWorkable, IFeedable{
    work(){
        console.log("Human is working");
    }
    eat(){
        console.log("Human is eating");
    }
}

class Robot implements IWorkable{
    work(){
        console.log("Robot is working");
    }
}

// Now, Robot only implements the work method and is not forced to implement the eat method.

// Real Backend Use Case, Separate interfaces for:
// ReadRepository
// WriteRepository
// Cacheable
// Retryable