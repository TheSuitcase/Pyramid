import RenderEngine from '../renderengine'
import Colors from '../colors'
import State from '../state';

class Action {
  constructor () {
    this.state = {}

    if (this.initialState) {
      this.state = this.initialState()
    }
  }
  getColors () {
    return Colors
  }
  getDelimiter () {
    return State.delimiter;
  }
  setState (data) {
    Object.assign(this.state, data)
    RenderEngine.render(this)
  }
  setResponse (...args) {
    RenderEngine.setResponse.apply(RenderEngine, args)
  }
}

export default Action
