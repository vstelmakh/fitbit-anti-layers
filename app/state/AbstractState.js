export {AbstractState};

class AbstractState {

    /**
     * @type {Element}
     * @private
     */
    _iconElement;

    /**
     * @param {Element} iconElement - Icon that represents current state
     */
    constructor(iconElement) {
        this._iconElement = iconElement;
    }

    /**
     * Start state actions
     */
    start() {
        this._iconElement.style.opacity = 1;
    }

    /**
     * Stop state actions
     */
    stop() {
        this._iconElement.style.opacity = 0.5;
    }
}
