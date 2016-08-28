import RenderEngine from './renderengine'
import State from './state';

class Action {
  constructor () {
    this.state = {}

    if (this.initialState) {
      this.state = this.initialState()
    }
  }
  getDelimiter () {
    return State.delimiter;
  }
  setState (data) {
    Object.assign(this.state, data)
    RenderEngine.render()
  }
  setResponse (...args) {
    // RenderEngine.setResponse.apply(RenderEngine, args)
  }
}

export default Action
