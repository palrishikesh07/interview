

// Selft implementation of EventEmitter class
class MyEventEmitter {
    constructor() {
        // [event]: listener[];
        this._event_listeners = {
        }

    }

    on(event, listener) {
        //
        if (!this._event_listeners[event]) {
            this._event_listeners[event] = [];
        }
        this._event_listeners[event].push(listener);
        return true;
    }

    emit(event, ...args) {
        //
        if (!this._event_listeners[event]) {
            return false;
        }

        const listeners = this._event_listeners[event];
        listeners.forEach((listener) => listener(...args));
    }

    off(event, listener) {
        if (!this._event_listeners[event]) {
            return false;
        }
        const index = this._event_listeners[event].indexOf(listener);
        console.log('...indexOf....', index);
        if (index < 0) {
            return false;
        }
        this._event_listeners[event].splice(index, 1);
        return true;
    }

    once(event, listener) {
        const wrapperFn = (...args) => {
            listener(...args);
            this.off(event, wrapperFn)
        };
        this.on(event, wrapperFn);
        return true;
    }
}

const sendWhatsAppMessage = (username) => console.log('WhatsApp Message ', username);

const e = new MyEventEmitter();
e.on('user:singup', (username) => console.log('User Signup ', username))
e.on('user:singup', (username) => console.log('Sending Email ', username))
// e.on('user:singup', sendWhatsAppMessage)
e.once('user:singup', sendWhatsAppMessage)
e.on('user:logout', (username) => console.log('Logout..... ', username))


e.emit('user:singup', 'HR 1')
e.emit('user:singup', 'HR 2')
// e.off('user:singup', sendWhatsAppMessage)
e.emit('user:singup', 'HR 3')
e.emit('user:logout', 'HR 1')
