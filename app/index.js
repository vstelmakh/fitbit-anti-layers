import clock from 'clock';
import document from 'document';
import {preferences} from 'user-settings';
import * as utils from '../common/utils';

// Update the clock every minute
clock.granularity = 'minutes';

// Get a handle on the <text> element
const time = document.getElementById('time');

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    if (preferences.clockDisplay === '12h') {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = utils.zeroPad(hours);
    }
    let mins = utils.zeroPad(today.getMinutes());

    time.text = `${hours}:${mins}`;
};


import {StateManager} from './state/StateManager';
import {HeartRateState} from './state/HeartRateState';
import {StepsState} from './state/StepsState';
import {CaloriesState} from './state/CaloriesState';

const activityValueElement = document.getElementById('activityValue');
const stateManager = new StateManager();

stateManager.addState(new HeartRateState(
    document.getElementById('heart'),
    activityValueElement
));

stateManager.addState(new StepsState(
    document.getElementById('steps'),
    activityValueElement
));

stateManager.addState(new CaloriesState(
    document.getElementById('flame'),
    activityValueElement
));

const screenButton = document.getElementById('screenButton');
screenButton.onactivate = function (e) {
    stateManager.startNextState();
};
