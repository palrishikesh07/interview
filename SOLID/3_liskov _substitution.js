// Child class should be replaceable with parent class without breaking behavior.
// Subclasses should not break parent class behavior.

// ❌ Bad Example
class Bird{
    fly(){
        console.log("Flying...");
    }
}

class Penguins extends Bird{
    fly(){
        throw new Error("Penguins can't fly!");
    }
}

// Problem
// Penguin breaks expected behavior.

// ✅ Good Example

class Bird {}

class FlyingBird extends Bird{
    fly(){
        console.log("Flying...");
    }
}

class Sparrow extends FlyingBird{};

class Penguin extends Bird{
    swim(){
        console.log("Swimming...");
    }
}
