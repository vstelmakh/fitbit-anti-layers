import document from 'document';
import {DateClock} from './clock/DateClock';
import {TimeClock} from './clock/TimeClock';
import {StateManager} from './state/StateManager';
import {HeartRateState} from './state/HeartRateState';
import {StepsState} from './state/StepsState';
import {CaloriesState} from './state/CaloriesState';

const dateElement = document.getElementById('date');
new DateClock(dateElement);

const timeElement = document.getElementById('time');
new TimeClock(timeElement);

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
    activityValueElement.animate('enable');
};
