import Action from '../action'

class Log extends Action {
  componentShouldClose () {
    return true
  }
  render () {
    return this.props[0]
  }
}

export default Log
