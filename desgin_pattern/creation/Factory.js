/*
Factory Method is a Creational Design Pattern that delegates object creation to subclasses instead of creating objects directly with new.

One-line Interview Definition:
Factory Method defines an interface for creating an object but lets subclasses decide which class to instantiate.
*/

// Normal Approach
/*

Scenario: Notification System
We want to send notifications through:
Email
SMS
Push Notification
*/

class EmailNotification {
    send() {
        console.log("Sending email notification")
    }
}

class SMSNotification {
    send() {
        console.log("Sending SMS notification")
    }
}

class PushNotification {
    send() {
        console.log("Sending push notification")
    }
}


// Client Code

function sendNotification(type) {
    let notification;

    if (type === "email") {
        notification = new EmailNotification();
    }
    else if (type == "sms") {
        notification = new SMSNotification();
    }
    else if (type == "push") {
        notification = new PushNotification();
    }

    notification.send();
}
sendNotification("sms");

/*
Problems ❌
1️⃣ Too many if / else conditions
2️⃣ Client knows all concrete classes
EmailNotification
SMSNotification
PushNotification

3️⃣ If a new notification is added (WhatsApp), we must modify the client code.
This breaks Open/Closed Principle.

*/