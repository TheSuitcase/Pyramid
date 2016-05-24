import Keyboard from './keyboard'

class Input {
  constructor () {
    this._data = []
    this._paused = false
  }
  get string () {
    return this._data.join('')
  }
  get array () {
    return this._data
  }
  clear () {
    this._data = []
    return this
  }
  pause () {
    this._paused = true
    return this
  }
  resume () {
    this._paused = false
    return this
  }
  pop () {
    return this._data.pop()
  }
}

export default Input
