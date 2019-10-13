export {AbstractState};

class AbstractState {

    _iconElement;

    constructor(iconElement) {
        this._iconElement = iconElement;
    }

    start() {
        this._iconElement.style.opacity = 1;
    }

    stop() {
        this._iconElement.style.opacity = 0.5;
    }
}