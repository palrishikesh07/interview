//Adapter will convert one interface into another.

//Step 1 — Adaptee (Existing System)
class PayPal {
    makePayment(value) {
        console.log("PayPal payment made for amount: " + value);
    }
}


// Step 2 — Adapter

class PayPalAdapter {
    constructor(paypal) {
        this.paypal = paypal;
    }

    pay(amount) {
        this.paypal.makePayment(amount)
    }
}

// Adapter translates the methods
// pay() -> makePayment();

// Step3 - Client Code


function processPayment(paymentSystem, amount) {
    paymentSystem.pay(amount);
}

const paypal = new PayPal();
const adapter = new PayPalAdapter(paypal);

processPayment(adapter, 100);