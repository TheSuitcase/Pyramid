import EventEmitter from 'eventemitter3'
import Util from 'util'

import Queue from './queue'
import Executer from './executer'

class Command extends EventEmitter {
  constructor (command) {
    super()

    this.state = {
      command,
      required: {},
      optional: {},
      options: {},
      subcommands: {},
      autocomplete: false,

      // Store the order of ui requested elements.
      queue: new Queue(),
    }

    Executer.bindActions(this, this.state.queue)

    return this
  }

  parse (args) {
    let required = {},
      optional = [],
      options = []

    if (this.state.required) {
      required = args.splice(0, 1)
    }

    args.forEach((arg) => {
      let match = arg.match(/\-\-?([\w0-9]+)/g) ? true : false
      if (match) {
        options.push(arg)
      } else {
        optional.push(arg)
      }
    })

    Executer.start(this)
  }

  required (command, description) {
    if (Util.isString(command)) {
      command = {[command]: description}
    }

    Object.assign(this.state.required, command)
    return this
  }
  optional (command, description) {
    if (Util.isString(command)) {
      command = {[command]: description}
    }

    Object.assign(this.state.optional, command)
    return this
  }
  option (command, description) {
    if (Util.isString(command)) {
      command = {[command]: description}
    }

    Object.assign(this.state.options, command)
    return this
  }

  subcommand (...args) {
    if (Util.isArray(args[0])) {
      args = args[0]
    }

    let commands = {}
    args.forEach((command) => {
      commands[command.state.command] = command
    })

    Object.assign(this.state.subcommands, commands)
    return this
  }

  autocomplete (bool = true) {
    this.state.autocomplete = bool
    return this
  }

  // Syntactic sugar
  ui (cb) {
    this.on('ui', cb)
    return this
  }

  action (cb) {
    this.on('action', cb)
    return this
  }

  clear () {
    this.state.queue.clear()
    return this
  }
}

export default Command

/*

  _runFeature (feature, cb) {
    // inquirer
    //   .prompt([feature])
    //   .then((answers) => {
    //     let keys = Object.keys(answers)
    //     let answer = answers[keys[0]]

    //     if (this.state.events.action) {
    //       this.state.events.action(this, feature, answer)
    //     }
    //     cb()
    //   })
  }
 */
