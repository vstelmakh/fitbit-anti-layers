export {Date};

import {AbstractClock} from "./AbstractClock";
import {zeroPad} from '../../common/utils';

class Date extends AbstractClock {

    /**
     * @type {Element}
     * @private
     */
    _valueElement;

    /**
     * @private
     */
    _monthMap = {0: 'JAN', 1: 'FEB', 2: 'MAR', 3: 'APR', 4: 'MAY', 5: 'JUN', 6: 'JUL', 7: 'AUG', 8: 'SEP', 9: 'OCT', 10: 'NOV', 11: 'DEC'};

    /**
     * @param {Element} valueElement
     */
    constructor(valueElement) {
        super();
        this._valueElement = valueElement;
    }

    /**
     * @returns {string}
     * @protected
     */
    _getGranularity() {
        return 'hours';
    }

    /**
     * @param {TickEvent} tickEvent
     * @protected
     */
    _tick(tickEvent) {
        let date = tickEvent.date;
        this._valueElement.text = this._getFormattedDate(date);
    }

    _getFormattedDate(date) {
        let month = this._monthMap[date.getMonth()];
        let day = zeroPad(date.getDate());
        return month + ' ' + day;
    }
}
