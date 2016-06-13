import Action from '../action'
import State from '../../state'

class Help extends Action {
  componentShouldExit () {
    return true
  }
  render () {
    if (!State.command) {
      return
    }

    let command = State.command

    return command.state.help.get()
  }
}

export default Help
