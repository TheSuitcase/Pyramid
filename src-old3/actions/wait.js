import Action from './action'

class Wait extends Action {
  initialState () {
    return {
      exit: false,
      time: 2, // in seconds.
      current: 0,
      output: [],
    }
  }
  componentDidMount () {
    let time = this.props[0] || 2

    this.setState({time})

    this.interval = setInterval(() => {

      let current = this.state.current
      let output = this.state.output

      if (current < this.state.time) {
        current++

        output.push(this.getDelimiter() + `Wait ${time - current} seconds!`)
        this.setState({current, output})
      } else {
        this.setState({exit: true})
      }
    }, 1000)
  }
  componentDidUnmount () {
    clearInterval(this.interval)
  }
  componentShouldExit () {
    return this.state.exit || false
  }
  render () {
    let output = []
    if (this.state.exit) {
      output = [this.getDelimiter() + `You waited ${this.state.time} seconds!`]
    } else {
      output.push(this.getDelimiter() + `You just have to wait ${this.state.time} seconds!`)

      output = output.concat(this.state.output)
    }
    return output
  }
}

export default Wait
