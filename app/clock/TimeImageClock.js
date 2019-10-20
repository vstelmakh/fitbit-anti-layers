export {TimeImageClock};

import {AbstractClock} from "./AbstractClock";
import {preferences} from 'user-settings';
import {zeroPad} from '../../common/utils';

class TimeImageClock extends AbstractClock {

    /**
     * @type {Element}
     * @private
     */
    _hourImage1;

    /**
     * @type {Element}
     * @private
     */
    _hourImage2;

    /**
     * @type {Element}
     * @private
     */
    _minuteImage1;

    /**
     * @type {Element}
     * @private
     */
    _minuteImage2;

    /**
     * @param {Element} hourImage1
     * @param {Element} hourImage2
     * @param {Element} minuteImage1
     * @param {Element} minuteImage1
     */
    constructor(hourImage1, hourImage2, minuteImage1, minuteImage2) {
        super();
        this._hourImage1 = hourImage1;
        this._hourImage2 = hourImage2;
        this._minuteImage1 = minuteImage1;
        this._minuteImage2 = minuteImage2;
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
        this._updateHours(date);
        this._updateMinutes(date);
    }

    /**
     * @param {Date} date
     * @private
     */
    _updateHours(date) {
        let hours = date.getHours();
        hours = (preferences.clockDisplay === '12h') ? (hours % 12 || 12) : hours;
        hours = zeroPad(hours);
        this._setImageChar(this._hourImage1, hours[0]);
        this._setImageChar(this._hourImage2, hours[1]);
    }

    /**
     * @param {Date} date
     * @private
     */
    _updateMinutes(date) {
        let minutes = date.getMinutes();
        minutes = zeroPad(minutes);
        this._setImageChar(this._minuteImage1, minutes[0]);
        this._setImageChar(this._minuteImage2, minutes[1]);
    }

    /**
     * @param {Element} imageElement
     * @param {string} char
     * @private
     */
    _setImageChar(imageElement, char) {
        imageElement.href = 'images/time/' + char + '.png';
    }
}
