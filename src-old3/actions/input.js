import Action from './action'
import Colors from '../colors'
import State from '../state'

class Input extends Action {
  initialState(){
    return {
      input: ''
    }
  }
  componentDidUnmount () {
    console.log('componentDidUnmount', this.state.input);
    this.setResponse(this.state.input)
  }
  userInputDidUpdate (char) {
    if (char === -1) { return }
    char = char.toLowerCase()
    this.setState({input: this.state.input + char});
  }
  userInputDidFireEvent (event) {
    if (event === 'return' && this.state.input !== undefined) {
      this.setState({exit: true})
    }
  }
  componentShouldExit () {
    return this.state.exit || false
  }
  render () {
    return [
      this.getDelimiter() + (this.props[0] || 'Input:') + this.state.input
    ]
  }
}

export default Input
