class Syntax {
  constructor (command) {
    this.command = command
    this.syntax = undefined
  }
  get () {
    return this.syntax
  }
  generate () {
    let command = this.command
    let syntax = [command.name]

    syntax = syntax.concat(this.collectParameter(command.state.parameters.required, '<', '>'))
    syntax = syntax.concat(this.collectParameter(command.state.parameters.optional, '[', ']'))
    syntax = syntax.concat(this.collectParameter(command.state.parameters.options))

    this.syntax = syntax.join(' ')
  }
  collectParameter (parameters, before, after) {
    let keys = Object.keys(parameters)
    return keys.map((key) => {
      return ([
        before || '',
        key,
        after || ''
      ].join(''))
    })
  }
}

export default Syntax
