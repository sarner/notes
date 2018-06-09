class EventCtrl {
    constructor () {
        this.listeners = [];
    }

    addListener(element, type, fnc) {
        this.listeners.push(new Listener(element, type, fnc));
    }

    registerEvents() {
        this.listeners.forEach((listener) => {
            document.getElementById(listener.id).addEventListener(listener.type, listener.fnc);
        });
    }

    unregisterEvents() {
        this.listeners.forEach((listener) => {
            const element = document.getElementById(listener.id);
            if (element !== null) {
                element.removeEventListener(listener.type, listener.fnc);
            }
        });
    }
}

class Listener {
    constructor (id, type, fnc) {
        this.id = id;
        this.type = type;
        this.fnc = fnc;
    }
}

export default EventCtrl;