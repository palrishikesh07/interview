/*
One-line Interview Definition:
Factory Method defines an interface for creating an object but lets subclasses decide which class to instantiate.

Client
  ↓
Factory
  ↓
Factory decides which object to create
  ↓
Returns object
*/


//Product Interface
class Notification {
    send() { }
}

//Concrete Products
class EmailNotification extends Notification {
    send() {
        console.log("Sending Email Notification");
    }
}

class SMSNotification extends Notification {
    send() {
        console.log("Sending SMS Notification..");
    }
}
//Concrete Products

class NotificationFactory {
    createNotification(type) {
        if (type == "email") {
            return new EmailNotification();
        }
        if (type == "sms") {
            return new SMSNotification();
        }
    }
}

//Client Code

const factory = new NotificationFactory();
const notification = factory.createNotification("email");
notification.send();


/*

7️⃣ Easy Trick to Remember (Interview)
Without Factory

Client → new EmailNotification()

With Factory
Client → Factory → Object


8️⃣ Factory   vs    Abstract Factory
Factory Method	        Abstract Factory
Creates one object	    Creates family of objects
Single product	        Multiple related products
Example: Notification	Example: Car + Bike


Use it when:
✔ Object creation logic is complex
✔ Many conditions (if/else) exist
✔ You want loose coupling
✔ Follow Open/Closed principle
*/