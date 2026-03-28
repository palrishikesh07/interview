//Separates an abstraction from its implementation so both can vary independently. 
//Decoupling abstraction from implementation


/*
Imagine we are building a Remote Control system for devices.

Devices:

TV
Radio

Remotes:
Basic Remote
Advanced Remote
Without Bridge, we create multiple classes for every combination.

*/

class BasicRemoteTV {
    on() {
        console.log("Basic TV turned on")
    }
}

class BasicRemoteRadio {
    on() {
        console.log("Basic Radio turned on")
    }
}

class AdvancedRemoteTV {
    on() {
        console.log("Advanced TV turned on")
    }
    mute() {
        console.log("TV Muted")
    }
}

class AdvancedRemoteRadio {
    on() {
        console.log("Advanced Radio turned on")
    }
    mute() {
        console.log("Radio Muted")
    }
}

//Usage

const remote = new AdvancedRemoteTV();
remote.on();
remote.mute();

/*
Class Explosion Problem
If we add:

SmartRemote

Projector

Speaker

Classes explode:

BasicRemoteTV
BasicRemoteRadio
BasicRemoteProjector

AdvancedRemoteTV
AdvancedRemoteRadio
AdvancedRemoteProjector

SmartRemoteTV
SmartRemoteRadio
SmartRemoteProjector

*/