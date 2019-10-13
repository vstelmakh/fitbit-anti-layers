export {AbstractState};

class AbstractState {

    /**
     * @type {Element}
     * @private
     */
    _iconElement;

    /**
     * @type {Element}
     * @protected
     */
    _valueElement;

    /**
     * @param {Element} iconElement - Icon that represents current state
     * @param {Element} valueElement - Element to print text value
     */
    constructor(iconElement, valueElement) {
        this._iconElement = iconElement;
        this._valueElement = valueElement;
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
        this._valueElement.text = '';
    }
}
