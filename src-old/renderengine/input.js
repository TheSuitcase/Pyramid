import Keyboard from './keyboard'
import Readline from './readline'

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
    Readline.line = ''
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
