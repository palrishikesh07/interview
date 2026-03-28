//Observer Pattern defines a one-to-many dependency so that when one object changes state, all its dependents are notified automatically.

/*
Very important for interviews.

YouTube Channel
YouTuber → Subscribers

When video uploads:

All subscribers get notification
*/


// Step 1 — Subject
// Subject manages observers.


class WeatherStation {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscriber(observer) {
        this.observers = this.observers.filter(obs => obs !== observer)
    }

    notify(temp) {
        this.observers.forEach(observer => observer.update(temp));
    }

    setTemperature(temp) {
        console.log("Temperature updated:", temp);
        this.notify(temp)
    }
}

// Step 2 — Observer Classes
// Mobile Display

class MobileDisplay {
    update(temp) {
        console.log("Mobile Display shows:", temp);
    }
}

class WebsiteDisplay {
    update(temp) {
        console.log("Website display shows:", temp);
    }
}

// LED Display

class LEDDisplay {
    update(temp) {
        console.log("LED display shows:", temp)
    }
}

//Step 3 — Client Code

const weatherStation = new WeatherStation();

const mobile = new MobileDisplay();
const website = new WebsiteDisplay();
const led = new LEDDisplay();

weatherStation.subscribe(mobile);
weatherStation.subscribe(website);
weatherStation.subscribe(led);

weatherStation.setTemperature(28)




// JavaScript Real Example
// Node.js uses Observer pattern.

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("orderPlaced", (data) => {
    console.log("Sending email", data);
});

emitter.on("orderPlaced", (data) => {
    console.log("Updating inventory", data);
});

emitter.emit("orderPlaced", { id: 1 });

// EventEmitter = Subject
// Listeners = Observers