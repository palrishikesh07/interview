//Open for extension, closed for modification.
//New functionality should be added through extension, not by modifying existing stable code.

//❌ Bad Example

class PaymentService{
    pay(method:string){
        if(method === 'credit_card'){
            console.log("Processing credit card payment...");
        } else if(method === 'paypal'){
            console.log("Processing PayPal payment...");
        }
    }
}

// Problem
// Every new payment method requires modifying existing code.


//✅ Good Example
interface PaymentMethod{
    pay(): void;
}

// Implement Different Payments

class CardPayment implements PaymentMethod{
    pay(){
        console.log("Processing credit card payment...");
    }
}

class PaypalPayment implements PaymentMethod{
    pay(){
        console.log("Processing PayPal payment...");
    }
}

// Payment Service

class PaymentService{
    processPayment(method: PaymentMethod){
        method.pay();
    }
}

// Now we can add new payment methods without modifying existing code, adhering to the Open/Closed Principle.   

const payService = new PaymentService();
payService.processPayment(new CardPayment());
payService.processPayment(new PaypalPayment());

