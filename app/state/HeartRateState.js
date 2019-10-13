export {HeartRateState};

import {AbstractState} from './AbstractState';
import {me as appbit} from 'appbit';
import {display} from 'display';
import {HeartRateSensor} from 'heart-rate';
import {BodyPresenceSensor} from 'body-presence';

class HeartRateState extends AbstractState {

    // For frequency and batch info see: https://dev.fitbit.com/build/guides/sensors/heart-rate/
    _frequency = 1;
    _batch = 1;
    _valueElement;
    _bodyPresenceSensor;
    _heartRateSensor;

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

            display.addEventListener('change', () => {
                this._hasToDisplayHeartRate() ? this._heartRateSensor.start() : this._heartRateSensor.stop();
            });

            if (this._bodyPresenceSensor) {
                this._bodyPresenceSensor.addEventListener("reading", () => {
                    if (!this._bodyPresenceSensor.present) {
                        this._setHeartRateValue('--');
                    }
                    this._hasToDisplayHeartRate() ? this._heartRateSensor.start() : this._heartRateSensor.stop();
                });
            }
        } else {
            this._setHeartRateValue('--');
        }
    }

    start() {
        super.start();

        if (this._bodyPresenceSensor) {
            this._bodyPresenceSensor.start();
        }

        if (this._heartRateSensor) {
            this._heartRateSensor.start();
        }
    }

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

    _setHeartRateValue(value) {
        this._valueElement.text = value + ' BPM';
    }

    _hasToDisplayHeartRate() {
        let isOnWrist = (this._bodyPresenceSensor) ? this._bodyPresenceSensor.present : true;
        return display.on && isOnWrist;
    }
}
