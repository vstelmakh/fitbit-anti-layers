export {StepsState};

import {AbstractState} from './AbstractState';
import {me as appbit} from 'appbit';
import {today} from 'user-activity';
import {formatNumber} from '../../common/utils';

class StepsState extends AbstractState {

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
     * @param {Element} iconElement - Icon that represents current state
     * @param {Element} valueElement - Element to print text value
     */
    constructor(iconElement, valueElement) {
        super(iconElement, valueElement);
    }

    start() {
        super.start();
        this._updateStepsValue();

        if (appbit.permissions.granted("access_activity")) {
            this._interval = setInterval(() => {
                this._updateStepsValue();
            }, this._intervalTimeMs);
        }
    }

    stop() {
        clearInterval(this._interval);
        super.stop();
    }

    /**
     * @private
     */
    _updateStepsValue() {
        this._valueElement.text = formatNumber(today.adjusted.steps);
    }
}
