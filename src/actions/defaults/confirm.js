import Action from '../action'
import Colors from '../../colors'
import Chalk from 'chalk'
import clc from 'cli-color'

class Confirm extends Action {
  userInputDidUpdate (char) {
    if (char === -1) { return }
    char = char.toLowerCase()

    if (char === 'y') {
      this.setState({confirm: true})
    }else if (char === 'n') {
      this.setState({confirm: false})
    }

    this.input.clear()
  }
  userInputDidFireEvent (event) {
    if (event === 'return') {
      this.setState({exit: true})
    }
  }
  componentDidUnmount () {
    clearInterval(this.interval)
  }
  componentShouldExit () {
    return this.state.exit || false
  }
  render () {
    let confirm

    if (this.state.confirm === true) {
      confirm = ' Yes'
    } else if (this.state.confirm === false) {
      confirm = ' No'
    } else {
      confirm = ''
    }
    return [
      (this.props[0] || 'Are you sure?') + '[Y/n]' + Chalk.cyan(confirm)
    ]
  }
}

export default Confirm
