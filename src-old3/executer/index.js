import Pyramid from '../pyramid'
import Actions from '../actions'
import State from '../state'
import RenderEngine from '../renderengine'
import Screen from '../renderengine/screen'
import Typeof from '../util/typeof'

let Executer = {
  parse(input = process.argv) {
    let next, command, errors

    // Remove unimportant arguments.
    input = this.prepareInput(input)

    // Handle input like: input.length === 0 etc.
    next = this.filterUninterestingInput(input)

    // Find a matching command.
    if (next) {
      command = this.findMatchingCommand(input)
    }

    if (command) {
      State.set({command})
      errors = this.parseCommand(command, input)
    }

    // Add the parse error to the action queue.
    if (errors) {
      this.addErrorToQueue(errors)
    }

    // Combine the action queues
    if (command && !errors) {
      this.combineActionQueues(command)
    }

    RenderEngine.start(this.renderEngineDidFinish.bind(this, command))
  },
  renderEngineDidFinish(command, answers) {
    if (command && command.state.callbacks.action) {
      let args = command.state.arguments

      let exit = command.state.callbacks.action(
        args.required,
        args.optional,
        args.options,
        answers
      )

      if (State.actions.queue.length > 0) {
        RenderEngine.start(this.renderEngineDidFinish.bind(this, command))
        return
      }

      if (exit !== false) {
        Screen.exit()
        return
      }
    } else {
      Screen.exit()
    }
  },
  callOverflowCallback() {
    if (!State.callbacks.overflow) { return; }
    let errors = State.callbacks.overflow()

    if (!Typeof(errors, 'string', 'array')) { return; }

    if (Typeof(errors, 'string')) {
      errors = [errors]
    }

    return errors
  },
  combineActionQueues(command) {
    State.actions.merge(command.state.actions)
  },
  addErrorToQueue(errors = []) {
    errors.forEach((error) => {
      Pyramid.error(error)
    })
  },
  parseCommand(command, input) {
    // Strip the command name. 
    let inputForCommand = input.slice(1, input.length)
    let args = command.parse(inputForCommand)

    if (args.errors.length > 0) {
      return args.errors
    }

    return
  },
  findMatchingCommand(input) {
    let command = State.commands[input[0]]

    if (command) { return command }

    let errors = this.callOverflowCallback(input) || []

    if (errors.length === 0) {
      errors.push(`Your command ${input[0]} does not exist!`)
    }

    errors.forEach((error) => {
      Pyramid.error(error)
    })

    return
  },
  prepareInput(input) {
    if (input === process.argv) {
      // Remove the two unimportant arguments
      // without destroying the orignal process.argv
      input = input.slice(2, input.length)
    }

    return input
  },
  filterUninterestingInput(input) {
    // Filter out uninteresting input attempts.
    if (input.length === 0) {
      Pyramid.error('Please enter a command!')
      return false
    }else if (input.length > 40) {
      Pyramid.error('Your command contains to many arguments!')
      return false
    }
    return true
  }

}

export default Executer
