export {CaloriesState};

import {AbstractState} from './AbstractState';
import {today} from 'user-activity';
import {formatNumber} from '../../common/utils';

class CaloriesState extends AbstractState {

    /**
     * @type {number}
     * @private
     */
    _interval;

    /**
     * @type {int}
     * @private
     */
    _intervalTimeMs = 2000;

    /**
     * @type {Element}
     * @private
     */
    _valueElement;

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
        this._updateCaloriesValue();

        this._interval = setInterval(() => {
            this._updateCaloriesValue();
        }, this._intervalTimeMs);
    }

    stop() {
        super.stop();
        clearInterval(this._interval);
        this._valueElement.text = '';
    }

    /**
     * @private
     */
    _updateCaloriesValue() {
        this._valueElement.text = formatNumber(today.adjusted.calories);
    }
}
