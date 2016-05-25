import Util from 'util'
import EventEmitter from 'events'

import Actions from '../actions'
import TypeOf from '../util/typeof'
import Queue from '../util/queue'
import State from '../util/state'

import Syntax from './syntax'
import Help from './help'
import Parameters from './parameters'
import Arguments from './arguments'

class Command {
  constructor (command) {
    this.name = command

    this.state = new State({
      command: command,
      description: undefined,
      docs: undefined,
      example: undefined,

      syntax: new Syntax(this),
      help: new Help(this),
      parameters: new Parameters(this),
      arguments: new Arguments(this),

      // Store the order of actions.
      actions: new Queue(),

      callback: {
        validate: undefined,
        action: undefined,
        done: undefined,
      },
    })

    Actions.merge(this, this.state.actions)

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
    this.state.arguments.generate(args)
    this.state.syntax.generate()
    this.state.help.generate()

    return this.state.arguments
  }

  /*
   * State modifiers
   */
  description (description) {
    if (!TypeOf(description, 'string', 'undefined')) { return this; }
    this.state.set({description})
    return this
  }

  docs (docs) {
    if (!TypeOf(docs, 'string')) { return this; }
    this.state.set({docs})
    return this
  }

  example (example) {
    if (!TypeOf(example, 'string')) { return this; }
    this.state.set({example})
    return this
  }

  /*
   * Callbacks
   */
  validate (cb) {
    this.state.set({
      callback: {
        validate: cb
      }
    })
    return this
  }

  action (cb) {
    this.state.set({
      callback: {
        action: cb
      }
    })
    return this
  }

  done (cb) {
    this.state.set({
      callback: {
        done: cb
      }
    })
    return this
  }
}

export default Command
