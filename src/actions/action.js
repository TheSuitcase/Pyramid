import RenderEngine from '../renderengine'
import Colors from '../colors'
import Delimiter from '../delimiter'

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
    return Delimiter.get.apply(Delimiter)
  }
  setState (data) {
    Object.assign(this.state, data)
    RenderEngine.render(this)
  }
  setResponse (...args) {
    RenderEngine.setResponse(args)
  }
}

export default Action
