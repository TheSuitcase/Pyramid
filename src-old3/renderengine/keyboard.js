import Keypress from 'keypress'
import EventEmitter from 'eventemitter3'
import Screen from './screen'
import State from '../state'
import Readline from './readline'

let events = ['up', 'down', 'left', 'right', 'tab', 'return', 'backspace']
let ee = new EventEmitter()

let Keyboard = {
  emit: ee.emit.bind(ee),
  on: ee.on.bind(ee),

  listen() {
    Keypress(process.stdin)
    Readline.input.on('keypress', this.onKeyPress.bind(this))
  },
  onKeyPress(ch, key) {
    let input = State.input

    // Close (ctrl + c).
    if (key && key.ctrl && key.name == 'c') {
      Screen.exit()
    }

    let char = this.getCharacter(ch, key)

    if (events.indexOf(char) > -1) {
      this.emit(char)
      this.emit('event', char)
    } else {
      this.emit('char', char)
    }
    return false
  },
  getCharacter(ch, key) {
    if (key && key.name) {
      if (key.name === 'return' || key.name === 'backspace' || key.name === 'tab') {
        return key.name
      }
    }
    if (ch) { return ch }
    if (key && key.name) {
      return key.name
    }
    return undefined
  }
}

Keyboard.listen()

export default Keyboard
