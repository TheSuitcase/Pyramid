import Action from '../action'

class Log extends Action {
  componentDidMount () {
    // console.log('componentDidMount')
  }
  componentDidUnmount () {
    // console.log('componentDidUnMount')
  }
  componentShouldClose () {
    return true // false
  }
  render () {
    return this.props[0]
  }
}

export default Log
