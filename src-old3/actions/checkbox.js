import Action from './action'
import Colors from '../colors';

class Checkbox extends Action {
  initialState () {
    return {
      position: 0,
      checked: -1,
    }
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

    this.props[1].forEach((item, pos) => {
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
      this.getDelimiter() + `${this.props[0]}: `,
      Colors.gray(`(Use your 'up' and 'down' keys to navigate)`),
    ]

    output = output.concat(this.renderItems())

    return this.state.exit ? this.getDelimiter() + `${this.props[0]}: ` + this.props[1][this.state.position] : output
  }
}

export default Checkbox
