export {AbstractClock};

import clock from 'clock';
import display from 'display';

class AbstractClock {

    /**
     * @type {{seconds: number, hours: number, minutes: number, off: number}}
     * @private
     */
    _granularityMap = {
        'off': 0,
        'hours': 1,
        'minutes': 2,
        'seconds': 3
    };

    constructor() {
        this._updateGranularity();

        display.addEventListener('change', () => {
            display.on ? this._updateGranularity() : clock.granularity = 'off';
        });

        clock.addEventListener('tick', (tickEvent) => {
            this._tick(tickEvent);
        });
    }

    /**
     * Update global clock granularity
     * @private
     */
    _updateGranularity() {
        let currentWeight = this._granularityMap[clock.granularity];
        let newWeight = this._granularityMap[this._getGranularity()];

        if (newWeight > currentWeight) {
            clock.granularity = this._getGranularity();
        }
    }

    /**
     * @returns {string} - available values: off, seconds, minutes, hours
     */
    _getGranularity() {
        return 'off';
    }

    /**
     * @param {TickEvent} tickEvent
     * @abstract
     * @protected
     */
    _tick(tickEvent);
}
