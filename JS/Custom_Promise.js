function useInbuiltPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("143");
            // reject("Some thing is not well bro..")
        }, 2000);
    })
}

// useInbuiltPromise().then((data) => {
//     console.log("Data is ", data);
// }).catch((err) => {
//     console.log("Error is ", err);
// }).finally(() => {
//     console.log("Done with function called");

// })

// try {
//     const promiseData = await useInbuiltPromise();
//     console.log(promiseData);

// } catch (error) {
//     console.log(error);

// }


// Custom promise



// Custom promise implementation using class and constructor function

/*
SPRR-T

S → State
P → Pending callbacks
R → Resolve
R → Reject
T → Then

             ┌── resolve ──→ fulfilled ──→ success callback
             │
executor ───→ pending
             │
             └── reject ───→ rejected ──→ error callback

*/
/**
 * MyPromise - A custom implementation of the Promise pattern
 * 
 * @class MyPromise
 * @description This class implements a simplified version of JavaScript's native Promise.
 * It manages asynchronous operations with three states: pending, fulfilled, and rejected.
 * 
 * @constructor
 * @param {Function} executor - A function that receives resolve and reject callbacks.
 *                              The executor is immediately invoked with these callbacks.
 *                              Signature: (resolve, reject) => void
 * 
 * @property {string} state - Tracks the current state of the promise.
 *                           Values: "pending" | "fulfilled" | "rejected"
 *                           Promises can only transition from "pending" to either "fulfilled" or "rejected"
 * 
 * @property {*} value - Stores the resolved value or rejection reason.
 *                       Initially undefined until promise settles.
 * 
 * @property {Array<Function>} onFulfilled - Queue of callbacks waiting for promise fulfillment.
 *                                           Executed when resolve() is called in pending state.
 * 
 * @property {Array<Function>} onRejected - Queue of callbacks waiting for promise rejection.
 *                                          Executed when reject() is called in pending state.
 * 
 * @method then
 * @param {Function} onFulfilled - Callback executed when promise is fulfilled.
 *                                 Receives the resolved value as parameter.
 * @param {Function} onRejected - Callback executed when promise is rejected.
 *                                Receives the error/reason as parameter.
 * @description Registers handlers for promise settlement.
 *              If already settled, handlers execute immediately.
 *              If still pending, handlers are queued for later execution.
 *              Note: This implementation doesn't return a new promise (incomplete chainability).
 * 
 * @example
 * const myPromise = new MyPromise((resolve, reject) => {
 *     setTimeout(() => resolve('Success!'), 1000);
 * });
 * 
 * myPromise.then(
 *     result => console.log(result),
 *     error => console.log(error)
 * );
 */
// class MyPromise {

//     constructor(executor) {

//         this.state = "pending"; // Initial state of the promise
//         this.value = undefined; // Initial value of the promise (undefined until resolved or rejected)

//         this.onFulfilled = []; // Queue of callbacks to execute when the promise is fulfilled
//         this.onRejected = []; // Queue of callbacks to execute when the promise is rejected

//         // Define the resolve function to transition the promise to fulfilled state
//         const resolve = (value) => {
//             if (this.state !== "pending") return; // Prevent state change if already settled

//             this.state = "fulfilled"; // Transition to fulfilled state
//             this.value = value; // Store the resolved value

//             this.onFulfilled.forEach(callback => { // Execute all queued success callbacks
//                 callback(value);
//             });
//         };

//         // Define the reject function to transition the promise to rejected state
//         const reject = (error) => {
//             if (this.state !== "pending") return; // Prevent state change if already settled

//             this.state = "rejected"; // Transition to rejected state
//             this.value = error; //  Store the rejection reason

//             this.onRejected.forEach(callback => { // Execute all queued error callbacks
//                 callback(error);
//             });
//         };

//         // Immediately invoke the executor function with resolve and reject callbacks
//         try {
//             executor(resolve, reject); // Execute the provided executor function
//         } catch (error) { // Handle any errors thrown during executor execution
//             reject(error);
//         }
//     }


//     // The then method registers callbacks for promise settlement.
//     then(onFulfilled, onRejected) {

//         if (this.state === "fulfilled") {
//             onFulfilled(this.value);
//         }

//         else if (this.state === "rejected") {
//             onRejected(this.value);
//         }

//         else {
//             this.onFulfilled.push(onFulfilled);
//             this.onRejected.push(onRejected);
//         }
//     }


//     catch(onRejected) {
//         return this.then(
//             value => value,
//             onRejected
//         );
//     }


//     finally(callback) {

//         if (this.state === "fulfilled") {
//             callback();
//         }

//         else if (this.state === "rejected") {
//             callback();
//         }

//         else {
//             this.onFulfilled.push(() => {
//                 callback();
//             });

//             this.onRejected.push(() => {
//                 callback();
//             });
//         }

//         return this;
//     }

// }



class MyPromise {

    constructor(executor) {

        // 1. Initial state
        this.state = "pending";
        this.value = undefined;

        // 2. Store callbacks
        this.onFulfilled = [];
        this.onRejected = [];

        // 3. Resolve
        const resolve = (value) => {

            // Promise can settle only once
            if (this.state !== "pending") {
                return;
            }

            this.state = "fulfilled";
            this.value = value;

            // Execute success callbacks
            this.onFulfilled.forEach(callback => {
                callback(value);
            });
        };

        // 4. Reject
        const reject = (error) => {

            // Promise can settle only once
            if (this.state !== "pending") {
                return;
            }

            this.state = "rejected";
            this.value = error;

            // Execute error callbacks
            this.onRejected.forEach(callback => {
                callback(error);
            });
        };

        // 5. Execute executor
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }


    // =========================
    // THEN
    // =========================

    then(
        onFulfilled = value => value,

        onRejected = error => {
            throw error;
        }
    ) {

        // Promise already fulfilled
        if (this.state === "fulfilled") {

            onFulfilled(this.value);
        }


        // Promise already rejected
        else if (this.state === "rejected") {

            onRejected(this.value);
        }


        // Promise still pending
        else {

            this.onFulfilled.push(onFulfilled);
            this.onRejected.push(onRejected);
        }

        return this;
    }


    // =========================
    // CATCH
    // =========================

    catch(onRejected) {

        return this.then(value => value, onRejected);
    }


    // ========================= 
    // FINALLY
    // =========================

    finally(callback) {

        if (this.state === "fulfilled") {

            callback();
        }

        else if (this.state === "rejected") {

            callback();
        }

        else {

            this.onFulfilled.push(() => {
                callback();
            });

            this.onRejected.push(() => {
                callback();
            });
        }

        return this;
    }
}


const promise2 = new MyPromise((resolve, reject) => {

    setTimeout(() => {
        // reject("Error: Something went wrong");
        resolve("Success: Data fetched successfully");
    }, 1000);

});

promise2.then(value => {
    console.log("Resolved:", value);
}).catch(error => {
    console.log("Rejected:", error);
}).finally(() => {
    console.log("Promise settled (either resolved or rejected)");
}); 