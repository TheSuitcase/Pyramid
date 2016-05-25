import Action from './actions/action'
import State from './state'
import Util from 'util'
import TypeOf from './util/typeof'
import Command from './command'
import Actions from './actions'

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
  },

  parse(args = process.argv) {
    if (!TypeOf(args, 'array')) {
      // TODO: show error!
      return
    }

    if (args === process.argv) {
      args = args.slice(2, args.length)
    }

    // Find a matching command
    if (args.length === 0) {
      State.actions.add(Actions.actions.log, 'Please enter a command!')
    }else if (args.length > 40) {
      State.actions.add(Actions.actions.log, 'you command contain out of to many space seperated characters/words')
    }

    let command = State.commands[args[0]]

    if (!command) {
      State.actions.add(Actions.actions.log, `Your command ${args[0]} does not exist!`)
    } else {
      // Parse the command and combine the action queues
      args.splice(0, 1)
      command.parse(args)

      if (command.state.arguments.errors && command.state.arguments.errors.length > 0) {
        command.state.arguments.errors.forEach((error) => {
          State.actions.add(Actions.actions.log, error)
        })
        command = undefined
      } else {
        State.set({command})
      }
    }


    Actions.execute(command)
  }

}

Actions.merge(Pyramid, State.actions)

export default Pyramid
