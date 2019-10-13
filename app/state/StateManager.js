export {StateManager};

class StateManager {

    states = [];
    _index = 0;

    addState(state) {
        this.states.push(state);
        if (this.states.length === 1) {
            this._getCurrentState().start();
        }
    }

    startNextState() {
        this._getCurrentState().stop();
        this._index++;
        if (this._index === this.states.length) {
            this._index = 0;
        }
        this._getCurrentState().start();
    }

    _getCurrentState() {
        return this.states[this._index];
    }
}
