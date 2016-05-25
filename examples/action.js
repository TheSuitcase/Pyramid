var Action = function () {
  console.log('Action constructor')
}

Action.prototype.componentShouldExit = function () {
  return true
}

Action.prototype.render = function () {
  console.log(this.props)
  return 'Action'
}

module.exports = Action
