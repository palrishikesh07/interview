// Implementing Facade Pattern in JavaScript

// We create a HomeTheaterFacade.

//Step 1 — Subsystems


class TV {
    on() {
        console.log("TV On")
    }
}

class SoundSystem {
    on() {
        console.log("Sound System ON")
    }

    setVolume() {
        console.log("Value set to 10")
    }
}

class DVDPlayer {
    on() {
        console.log("DVD Player On")
    }
    play(movie) {
        console.log(`Playing ${movie}`)
    }
}

class Lights {
    dim() {
        console.log("Light dimed")
    }
}


// Step 2 — Facade Class
// This hides complexity.


class HomeTheatherFacade {
    constructor(tv, sound, dvd, lights) {
        this.tv = tv;
        this.sound = sound;
        this.dvd = dvd;
        this.lights = lights;
    }

    watchMovie(movie) {
        console.log("Starting movie...")
        this.lights.dim()
        this.tv.on();
        this.sound.setVolume();
        this.dvd.on();
        this.dvd.play(movie)
    }

}

// Step 3 — Client Code
// Now client calls only one method.

const tv = new TV();
const sound = new SoundSystem();
const dvd = new DVDPlayer();

const lights = new Lights();

const homeTheater = new HomeTheatherFacade(tv, sound, dvd, lights);
homeTheater.watchMovie("Avengers")

//Client does not know subsystem complexity.

/*
JavaScript Real Example
Example from real projects:
Frontend → API Service (Facade) → Multiple APIs


UI
 |
UserService (Facade)
 |
Auth API
Profile API
Order API

Diff Adapter vs Facade

Adapter → Type converter
Facade → Simplifier
*/