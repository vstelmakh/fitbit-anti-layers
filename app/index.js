import document from 'document';
import {DateClock} from './clock/DateClock';
import {TimeImageClock} from './clock/TimeImageClock';
import {StateManager} from './state/StateManager';
import {HeartRateState} from './state/HeartRateState';
import {StepsState} from './state/StepsState';
import {CaloriesState} from './state/CaloriesState';

const dateElement = document.getElementById('date');
new DateClock(dateElement);

const timeHourElement1 = document.getElementById('hour1');
const timeHourElement2 = document.getElementById('hour2');
const timeMinuteElement1 = document.getElementById('minute1');
const timeMinuteElement2 = document.getElementById('minute2');
new TimeImageClock(timeHourElement1, timeHourElement2, timeMinuteElement1, timeMinuteElement2);

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
