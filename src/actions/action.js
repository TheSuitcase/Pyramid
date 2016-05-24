import RenderEngine from '../renderengine'

class Action {
  constructor () {
    this.state = {}

    if (this.initialState) {
      this.state = this.initialState()
    }
  }
  setState (data) {
    Object.assign(this.state, data)
    RenderEngine.render(this)
  }
}

export default Action
