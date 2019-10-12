export { StepsState };

import { AbstractState } from './AbstractState';

class StepsState extends AbstractState {
  
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
