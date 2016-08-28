import Action from './action'

class Confirm extends Action {
  componentDidUnmount () {
    this.setResponse(this.state.confirm)
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
    if (event === 'return' && this.state.confirm !== undefined) {
      this.setState({exit: true})
    }
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
      this.getDelimiter() + (this.props[0] || 'Are you sure?') + ' [Y/n]' + State.colors.default(confirm)
    ]
  }
}

export default Confirm
