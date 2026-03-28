//Adapter pattern converts the interface of a class into another interface that clients expect.
//Adapter: Allows incompatible interfaces to work together by wrapping one interface to match another. 

/*

Scenario
Our application expects a payment method with pay(amount).
But a third-party PayPal API uses makePayment(value).
*/

//Third-party Service
class PayPal {
    makePayment(value) {
        console.log("PayPal payment made for amount: " + value);
    }
}

// Out Application
function processPayment(paymentSystem, amount) {
    paymentSystem.pay(amount);
}

// Client Code
const paypal = new PayPal();

// ❌ Problem: PayPal does not have pay()
processPayment(paypal, 100);

/*
Problem
Application expects → pay()
PayPal provides     → makePayment()


If we try to fix it directly:
paypal.pay = function(amount){
  this.makePayment(amount)
}
This modifies third-party code, which is bad practice.

Instead we use an Adapter.

*/

