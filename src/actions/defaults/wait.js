import Action from '../action'

class Wait extends Action {
  initialState () {
    return {
      exit: false,
      input: '',
      events: [],
    }
  }
  componentDidMount () {
    this.setState({count: 0})
    // this.interval = setInterval(() => {

    //   if (this.state.count >= 10) {
    //     this.setState({exit: true})
    //     return
    //   }

  //   this.setState({count: this.state.count + 1})
  // }, 100)
  }
  userInputDidUpdate (char) {
    this.setState({count: this.state.count + 1})
    if (this.state.count + 1 > 10) {
      this.setState({exit: true})
    }
  // console.log('userInputDidUpdate', char)
  // this.setState({exit: true}) // input: this.state.input + char})
  }
  userInputDidFireEvent (event) {
    // console.log('userInputDidFireEvent', event)
    // let events = this.state.events
    // events.push(event)
    // this.setState({events})
  }
  componentDidUnmount () {
    clearInterval(this.interval)
  }
  componentShouldExit () {
    return this.state.exit || false
  }
  render () {
    return [
      '[' + this.state.count + ']' + this.input.string,
    ]
  }
}

export default Wait
