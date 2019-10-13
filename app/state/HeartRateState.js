export {HeartRateState};

import {AbstractState} from './AbstractState';
import {me as appbit} from 'appbit';
import {HeartRateSensor} from 'heart-rate';
import {BodyPresenceSensor} from 'body-presence';

class HeartRateState extends AbstractState {

    /**
     * @type {number} - for frequency and batch info see: https://dev.fitbit.com/build/guides/sensors/heart-rate/
     * @private
     */
    _frequency = 1;

    /**
     * @type {number} - for frequency and batch info see: https://dev.fitbit.com/build/guides/sensors/heart-rate/
     * @private
     */
    _batch = 1;

    /**
     * @type {Element}
     * @private
     */
    _valueElement;

    /**
     * @type {BodyPresenceSensor}
     * @private
     */
    _bodyPresenceSensor;

    /**
     * @type {HeartRateSensor}
     * @private
     */
    _heartRateSensor;

    /**
     * @param {Element} iconElement - Icon that represents current state
     * @param {Element} valueElement - Element to print text value
     */
    constructor(iconElement, valueElement) {
        super(iconElement);

        this._valueElement = valueElement;

        if (BodyPresenceSensor && appbit.permissions.granted('access_activity')) {
            this._bodyPresenceSensor = new BodyPresenceSensor();
        }

        if (HeartRateSensor && appbit.permissions.granted('access_heart_rate')) {
            this._heartRateSensor = new HeartRateSensor({frequency: this._frequency, batch: this._batch});
            this._heartRateSensor.addEventListener('reading', () => {
                this._setHeartRateValue(this._heartRateSensor.heartRate);
            });

            if (this._bodyPresenceSensor) {
                this._bodyPresenceSensor.addEventListener("reading", () => {
                    if (!this._bodyPresenceSensor.present) {
                        this._setHeartRateValue('--');
                    }
                    this._isOnWrist() ? this._heartRateSensor.start() : this._heartRateSensor.stop();
                });
            }
        } else {
            this._setHeartRateValue('--');
        }
    }

    /**
     * Start state actions
     */
    start() {
        super.start();

        if (this._bodyPresenceSensor) {
            this._bodyPresenceSensor.start();
        }

        if (this._heartRateSensor) {
            this._heartRateSensor.start();
        }
    }

    /**
     * Stop state actions
     */
    stop() {
        super.stop();

        if (this._bodyPresenceSensor) {
            this._bodyPresenceSensor.stop();
        }

        if (this._heartRateSensor) {
            this._heartRateSensor.stop();
        }

        this._valueElement.text = '';
    }

    /**
     * @param {string} value
     * @private
     */
    _setHeartRateValue(value) {
        this._valueElement.text = value + ' BPM';
    }

    /**
     * @returns {boolean}
     * @private
     */
    _isOnWrist() {
        return (this._bodyPresenceSensor) ? this._bodyPresenceSensor.present : true;
    }
}
