export {DateClock};

import {AbstractClock} from "./AbstractClock";
import {zeroPad} from '../../common/utils';

class DateClock extends AbstractClock {

    /**
     * @type {Element}
     * @private
     */
    _valueElement;

    /**
     * @private
     */
    _monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

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

    /**
     * @param {Date} date
     * @returns {string}
     * @private
     */
    _getFormattedDate(date) {
        let month = this._monthNames[date.getMonth()];
        let day = zeroPad(date.getDate());
        return month + ' ' + day;
    }
}
