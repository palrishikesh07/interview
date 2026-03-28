// Imagine we are building a Home Theater System.
// To watch a movie we must control many subsystems:
// TV
// Sound System
// DVD Player
// Lights
// ❌ Without Facade
// Client must call every system manually.

class TV {
    on() {
        console.log("TV On");
    }
}

class SoundSystem {
    on() {
        console.log("Sound system ON")
    }

    setVolume() {
        console.log("Vloume set to 10")
    }
}

class DVDPlayer {
    on() {
        console.log("DVD Pllayer ON")
    }
    play(movie) {
        console.log(`Playing ${movie}`)
    }
}

class Lights {
    dim() {
        console.log("Light dimmed");
    }
}


const tv = new TV();
const sound = new SoundSystem();
const dvd = new DVDPlayer();
const lights = new Lights();

lights.dim();
tv.on();
sound.on();
sound.setVolume();
dvd.on();
dvd.play("Avengers");