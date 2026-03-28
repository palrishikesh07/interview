class Subject {
    constructor() {
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }
    notifiy(data) {
        this.observers.forEach((observer) => observer.update(data));
    }
}

class Observer {
    update(data) {
        console.log('Received: ', data);
    }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1)
subject.subscribe(observer2)
subject.notifiy("Hello Observer!");