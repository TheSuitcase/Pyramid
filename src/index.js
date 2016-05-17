import chalk from 'chalk'
import Util from 'util'
import Command from './command'

import Executer from './executer'
import State from './state'
import Actions from './actions'
import EventEmitter from 'events'

let ee = new EventEmitter()

let Pyramid = {
  emit: ee.emit.bind(ee),
  on: ee.on.bind(ee),

  version(version) {
    State.version = version
    return this
  },

  directory(...paths) {
    if (Util.isArray(paths[0])) {
      paths = paths[0]
    }
    State.directories = State.directories.concat(paths)
    return this
  },

  // Set the delimiter.
  delimiter(delimiter) {
    if (Util.isString(delimiter)) {
      State.delimiter.default = delimiter
      return this
    }

    // TODO: Log error
    if (!Util.isObject(delimiter)) { return this; }

    let keys = Object.keys(delimiter)
    let item

    keys.forEach((key) => {
      item = delimiter[key]

      // Convert to object.
      if (Util.isString(item)) {
        item = {delimiter: item}
      }

      if (item.color) {
        State.color[key] = item.color
      }
      if (item.delimiter) {
        State.delimiter[key] = item.delimiter
      }
    })
    return this
  },

  color(color) {
    if (Util.isString(color)) {
      color = {default: color}
    }

    if (!Util.isObject(color)) {
      return
    }

    Object.assign(State.color, color)
    return this
  },

  welcome(...args) {
    State.welcome = args.join('\n')
    return this
  },

  goodby(...args) {
    State.goodby = args.join('\n')
    return this
  },

  overflow(cb) {
    State.callbacks.overflow = cb
    return this
  },

  autocomplete(bool = true) {
    State.autocomplete = bool
  },

  command(string) {
    let command = new Command(string)
    State.commands[command.state.command] = command
    return command
  },

  parse(args = process.argv) {
    args.splice(0, 2)

    let command = args[0]

    if (State.commands[command]) {
      args.splice(0, 1)
      State.commands[command].parse(args)
      return this
    }

    // Give the user the posibility to process the missing request.
    if (State.callbacks.overflow) {
      State.callbacks.overflow(args)
      return this
    }

    this.clear()

    // Default for handling missing commands.
    if (command) {
      this.log(`The command '${command}' is not available!`)
    } else {
      this.log('Please enter a command or for help type --help')
    }

    // Flush the queue.
    Executer.start()

    return this
  },

  clear() {
    State.queue.clear()
    return this
  }
}

// Add the actions.
Executer.bindActions(Pyramid, State.queue)

export default Pyramid
module.exports = Pyramid
