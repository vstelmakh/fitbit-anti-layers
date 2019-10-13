export {Time};

import {AbstractClock} from "./AbstractClock";
import {preferences} from 'user-settings';
import {zeroPad} from '../../common/utils';

class Time extends AbstractClock {

    /**
     * @type {Element}
     * @private
     */
    _valueElement;

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
        return 'minutes';
    }

    /**
     * @param {TickEvent} tickEvent
     * @protected
     */
    _tick(tickEvent) {
        let date = tickEvent.date;
        this._valueElement.text = this._getFormattedTime(date);
    }

    /**
     * @param {Date} date
     * @returns {string}
     * @private
     */
    _getFormattedTime(date) {
        let hours = date.getHours();
        hours = (preferences.clockDisplay === '12h') ? this._getHours12Format(hours) : this._getHours24Format(hours);

        let minutes = date.getMinutes();
        minutes = zeroPad(minutes);

        return hours + ':' + minutes;
    }

    /**
     * @param {int} hours
     * @returns {string}
     * @private
     */
    _getHours12Format(hours) {
        return (hours % 12 || 12).toString();
    }

    /**
     * @param {int} hours
     * @returns {string}
     * @private
     */
    _getHours24Format(hours) {
        return zeroPad(hours);
    }
}
