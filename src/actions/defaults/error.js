import Action from '../action'
import Colors from '../../colors'

// Lowercase error because `Error` is
// a reserved word in javascript.
class error extends Action {
  componentShouldClose () {
    return true
  }
  render () {
    return Colors.gray('[Suitcase]') + ' ' + Colors.red('X') + ' ' + this.props[0]
  }
}

export default error
