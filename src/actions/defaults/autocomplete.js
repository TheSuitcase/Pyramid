import Action from '../action'
import State from '../../state'

class Autocomplete extends Action {
  componentShouldExit () {
    return false
  }
  render () {
    let command = State.command.state.parameters

    let suggestions = []
    let keys = Object.keys(command.optional)

    keys.forEach((key) => {
      if (command.optional[key].autocomplete) {
        suggestions = suggestions.concat(command.optional[key].autocomplete)
      }
    })

    return [
      'Autocomplete:' + this.input.string,
      'Suggestions:' + suggestions.join(', ')
    ]
  }
}

export default Autocomplete
