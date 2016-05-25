import Action from '../action'
import Colors from '../../colors'
import Chalk from 'chalk'
import clc from 'cli-color'

class Checkbox extends Action {
  initialState () {
    return {
      position: 0,
      checked: -1,
    }
  }
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
    let position = this.state.position

    if (event === 'return') {
      this.setState({exit: true, checked: position})
    }else if (event === 'up') {
      position--
    }else if (event === 'down') {
      position++
    }

    if (position > this.props.length - 1) {
      position = this.props.length - 1
    }else if (position < 0) {
      position = 0
    }

    this.setState({position})
  }
  componentDidUnmount () {}
  componentShouldExit () {
    this.setResponse(this.state.checked)
    return this.state.exit || false
  }
  renderItems () {
    let items = []

    this.props.forEach((item, pos) => {
      items.push([
        '- [',
        this.state.position === pos ? 'x' : ' ',
        ']',
        ' ' + item
      ].join(''))
    })

    return items
  }
  render () {
    let output = [
      'Checkboxes: (Use your `up` and `down` keys to navigate)',
    ]

    output = output.concat(this.renderItems())

    return this.state.exit ? 'Checkboxes: ' + Chalk.cyan(this.props[this.state.position]) : output
  }
}

export default Checkbox
