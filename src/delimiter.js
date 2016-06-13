import Colors from './colors'
import State from './state'

let Delimiter = {
  get() {
    return State.colors.default(State.delimiter.default) + ' '
  }
}

export default Delimiter
