/*
Bridge Pattern separates two things:

Abstraction
(Remote)

Implementation
(Device)

Bridge Pattern separates two things:


Abstraction
    (Remote)

Implementation
    (Device)


Bridge = Connect Abstraction with Implementation
Remote → Bridge → Device

*/

// Step 1 — Implementation Interface

class Device {
    on() { }
    off() { }
}

//Step 2 — Concrete Implementations

class TV extends Device {
    on() {
        console.log("TV is ON")
    }

    off() {
        console.log("TV is OFF")
    }
}

class Radio extends Device {
    on() {
        console.log("Radio is ON")
    }

    off() {
        console.log("Radio is OFF");
    }
}
// Step 3 — Abstraction(Remote)

class RemoteControl {
    constructor(device) {
        this.device = device;
    }
    turnOn() {
        this.device.on();
    }
    turnOff() {
        this.device.off();
    }
}

//Step 4 — Refined Abstraction

class AdvanceRemote extends RemoteControl {
    mute() {
        console.log("Device muted")
    }
}

//5. Usage

const tv = new TV();
const remote = new RemoteControl(tv);
remote.turnOn();

const radio = new Radio();
const advanceRemote = new AdvanceRemote(radio);
advanceRemote.turnOn();
advanceRemote.mute();

/*
Abstraction
   |
RemoteControl
   |
AdvancedRemote
   |
   |------ Bridge ------
                     |
                  Device
                     |
            -----------------
            |               |
           TV             Radio

*/
