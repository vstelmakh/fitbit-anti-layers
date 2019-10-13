export {StepsState};

import {AbstractState} from './AbstractState';

class StepsState extends AbstractState {

    /**
     * @param {Element} iconElement - Icon that represents current state
     * @param {Element} valueElement - Element to print text value
     */
    constructor(iconElement, valueElement) {
        super(iconElement);

        this._valueElement = valueElement;
    }

    /**
     * Start state actions
     */
    start() {
        super.start();
    }

    /**
     * Stop state actions
     */
    stop() {
        super.stop();
    }
}
