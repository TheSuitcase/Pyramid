import Action from './actions/action'
import State from './state'
import Util from 'util'
import TypeOf from './util/typeof'
import Command from './command'

let Pyramid = {
  Action, State,

  version(version = '0.0.0') {
    if (!TypeOf(version, 'string')) { return this; }
    State.set({version})
    return this
  },

  welcome(message) {
    if (!TypeOf(version, 'string', 'array', 'undefined')) { return this; }
    State.set({welcome: message})
    return this
  },

  goodby(message) {
    if (!TypeOf(version, 'string', 'array', 'undefined')) { return this; }
    State.set({goodby: message})
    return this
  },

  color(colors) {
    if (!TypeOf(colors, 'object')) { return this; }
    State.set({colors})
    return this
  },

  delimiter(delimiter) {
    if (TypeOf(delimiter, 'string')) {
      State.set({delimiter: {
          default: delimiter
      }})
      return this
    }

    if (!TypeOf(delimiter, 'object')) { return this}

    State.set({delimiter})
    return this
  },

  command(command) {
    if (!TypeOf(command, 'string')) { return }
    return State.commands[command] = new Command(command)
  }

}

export default Pyramid
