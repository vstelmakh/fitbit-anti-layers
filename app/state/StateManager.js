export {StateManager};

import display from 'display';

class StateManager {

    /**
     * @type {AbstractState[]}
     */
    states = [];

    /**
     * @type {number}
     * @private
     */
    _index = 0;

    constructor() {
        display.addEventListener('change', () => {
            let currentState = this._getCurrentState();
            display.on ? currentState.start() : currentState.stop();
        });
    }

    /**
     * @param {AbstractState} state
     */
    addState(state) {
        this.states.push(state);
        if (this.states.length === 1) {
            this._getCurrentState().start();
        }
    }

    /**
     * Stop current and start next state
     */
    startNextState() {
        this._getCurrentState().stop();
        this._index++;
        if (this._index === this.states.length) {
            this._index = 0;
        }
        this._getCurrentState().start();
    }

    /**
     * @returns {AbstractState}
     * @private
     */
    _getCurrentState() {
        return this.states[this._index];
    }
}
