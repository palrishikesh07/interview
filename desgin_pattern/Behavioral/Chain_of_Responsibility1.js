/*
Instead of one class deciding everything:
We create a chain of handlers.

Each handler:
1️⃣ Handles request
2️⃣ Or passes request to next handler


Request → Handler1 → Handler2 → Handler3

// Each decides:
Can I handle it?
Yes → Handle
No → Pass forward
*/

/*
Definition:
Chain of Responsibility passes a request along a chain of handlers until one handler processes it.
*/


/*
Real World Examples
Very important for interviews.
Express.js Middleware

Request
  |
Auth Middleware
  |
Validation Middleware
  |
Controller

handle OR next()
*/


//Step 1 — Base Handler


class Approver {
    setNext(approver) {
        this.next = approver;
    }

    approve(days) {
        if (this.next) {
            this.next.approve(days);
        }
    }
}
//This creates the chain.

// Step 2 — Concrete Handlers

// Manager
class Manager extends Approver {
    approve(days) {
        if (days <= 3) {
            console.log("Manager approved the leave");
        }
        else {
            super.approve(days);
        }
    }
}

//Director
class Director extends Approver {
    approve(days) {
        if (days <= 7) {
            console.log("Director Approved the leave");
        }
        else {
            super.approve(days);
        }
    }
}

// CEO
class CEO extends Approver {
    approve(days) {
        console.log("CEO Approved the leave");
    }
}

//Step 3 — Create the Chain

const manager = new Manager();
const director = new Director();
const ceo = new CEO();

manager.setNext(director);
director.setNext(ceo);

/*
Chain created:
Manager → Director → CEO
*/


//Step 4 — Client Request

manager.approve(2);
manager.approve(5);
manager.approve(10);

/*
 Final Flow
Client Request
    |
Manager
    |
Director
    |
    CEO


When to Use Chain of Responsibility
use it when:

1️⃣ Multiple objects can handle a request
2️⃣ Handler should be decided at runtime
3️⃣ Avoid large if-else blocks

Express Middleware
Validation Pipeline
Logging System
Event Handling
Request Processing


JavaScript Real Example (Express Middleware)
This is literally Chain of Responsibility.

app.use(authMiddleware);
app.use(validationMiddleware);
app.use(controller);

Express Middleware = Chain of Responsibility
*/

