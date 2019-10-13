export {CaloriesState};

import {AbstractState} from './AbstractState';

class CaloriesState extends AbstractState {

    /**
     * @param {Element} iconElement - Icon that represents current state
     * @param {Element} valueElement - Element to print text value
     */
    constructor(iconElement, valueElement) {
        super(iconElement);

        this._valueElement = valueElement;
    }

    start() {
        super.start();
    }

    stop() {
        super.stop();
    }
}
