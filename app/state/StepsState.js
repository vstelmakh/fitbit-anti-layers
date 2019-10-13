export {StepsState};

import {AbstractState} from './AbstractState';
import {today} from 'user-activity';
import {formatNumber} from '../../common/utils';

class StepsState extends AbstractState {

    /**
     * @type {number}
     * @private
     */
    _updateInterval;

    /**
     * @type {int}
     * @private
     */
    _updateIntervalTimeMs = 2000;

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

    /**
     * Start state actions
     */
    start() {
        super.start();
        this._updateStepsValue();

        this._updateInterval = setInterval(() => {
            this._updateStepsValue();
        }, this._updateIntervalTimeMs);
    }

    /**
     * Stop state actions
     */
    stop() {
        super.stop();
        clearInterval(this._updateInterval);
        this._valueElement.text = '';
    }

    _updateStepsValue() {
        this._valueElement.text = formatNumber(today.adjusted.steps);
    }
}
