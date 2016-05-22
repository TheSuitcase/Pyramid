import Util from 'util'
import EventEmitter from 'events'

import TypeOf from '../util/typeof'
import Queue from '../util/queue'
import State from '../util/state'

import Syntax from './syntax'
import Help from './help'
import Parameters from './parameters'
import Arguments from './arguments'
import Errors from './errors'

class Command {
  constructor (command) {
    this.name = command

    this.state = {
      command: command,
      description: undefined,

      syntax: new Syntax(this),
      help: new Help(this),
      parameters: new Parameters(this),
      arguments: new Arguments(this),
      errors: new Errors(),

      // Store the order of actions.
      actions: new Queue(),

      callback: {
        validate: undefined,
        action: undefined,
        done: undefined,
      },
    }

    // Actions.merge(this, this.state.actions)
    // Executer.bindActions(this, this.state.queue)

    return this
  }

  required (...args) {
    this.state.parameters.parse('required', args)
    return this
  }
  optional (...args) {
    this.state.parameters.parse('optional', args)
    return this
  }
  option (...args) {
    this.state.parameters.parse('option', args)
    return this
  }

  parse (args) {
    this.state.arguments.generate()
    this.state.syntax.generate()
    this.state.help.generate()

    return this.state.arguments
  }

  /*
   * State modifiers
   */
  description (description) {
    if (!TypeOf(description, 'string', 'undefined')) { return this; }
    this.state.description = description
    return this
  }

  /*
   * Callbacks
   */
  validate (cb) {
    this.state.callback.validate = cb
    return this
  }

  action (cb) {
    this.state.callback.action = cb
    return this
  }

  done (cb) {
    this.state.callback.done = cb
    return this
  }
}

export default Command
