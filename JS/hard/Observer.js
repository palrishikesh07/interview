//Observer is a design pattern where one object (Subject) notifies multiple other 
// objects (Observers) whenever something changes.

class Subject {
    constructor() {
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }
    notifiy(data) {
        this.observers.forEach((observer) => observer(data));
    }
}



const youtube = new Subject();

youtube.subscribe((msg)=>{
    console.log(`User 1: `, msg)
})

youtube.subscribe((msg)=>{
    console.log(`User 2: `, msg)

})

youtube.notifiy("New JS Task completed!");