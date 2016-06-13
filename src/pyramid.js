import Action from './actions/action'
import State from './state'
import Util from 'util'
import TypeOf from './util/typeof'
import Command from './command'
import Actions from './actions'
import Executer from './executer'
import Colors from './colors'

let Pyramid = {
  Action, State,
  colors: Colors,

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
    if (TypeOf(color, 'string')) {
      State.set({colors: {
          default: color
      }})
      return this
    }

    if (!TypeOf(colors, 'object')) { return this; }

    for (let i in colors) {
      if (!Typeof(i, 'function')) {
        delete colors[i]
      }
    }

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

    // Only strings are allowed.
    for (let i in delimiter) {
      if (!Typeof(i, 'string')) {
        delete delimiter[i]
      }
    }

    State.set({delimiter})
    return this
  },

  command(command) {
    if (!TypeOf(command, 'string')) { return }
    return State.commands[command] = new Command(command)
  },

  addAction(...args) {
    Actions.add.apply(Actions, args)
    return this
  },

  removeAction(...args) {
    Actions.remove.apply(Actions, args)
    return this
  },

  // Callbacks.
  action(cb) {
    if (!TypeOf(cb, 'function')) { return }
    State.callbacks.action = cb
    return this
  },

  validate(cb) {
    if (!TypeOf(cb, 'function')) { return }
    State.callbacks.validate = cb
    return this
  },

  exit(cb) {
    if (!TypeOf(cb, 'function')) { return }
    State.callbacks.exit = cb
    return this
  },

  overflow(cb) {
    if (!TypeOf(cb, 'function')) { return }
    State.callbacks.overflow = cb
    return this
  },

  parse() {
    Executer.parse.apply(Executer, arguments)
    return this
  }

}

Actions.merge(Pyramid, State.actions)

export default Pyramid
