export { CaloriesState };

import { AbstractState } from './AbstractState';

class CaloriesState extends AbstractState {
  
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
