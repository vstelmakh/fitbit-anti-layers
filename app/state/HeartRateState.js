export { HeartRateState };

import { AbstractState } from './AbstractState';

class HeartRateState extends AbstractState {

  constructor(iconElement, valueElement)
  {
    super(iconElement);

    this._valueElement = valueElement;
  }

  start()
  {
    super.start();
  }

  stop()
  {
    super.stop();
  }
}
