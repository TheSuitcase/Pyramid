import Colors from '../colors'

class Help {
  constructor (command) {
    this.command = command
    this.help = []
  }
  get () {
    return this.help
  }
  generate () {
    let help = []

    // Syntax
    help.push([
      Colors.yellow('syntax  '),
      '    ',
      this.command.state.syntax.get()
    ].join(' '))
    help.push(Colors.blur('----------------------------'))

    // Required
    help = help.concat(this.collectParameter(
      this.command.state.parameters.required,
      'required',
      Colors.red
    ))

    help = help.concat(this.collectParameter(
      this.command.state.parameters.optional,
      'optional',
      Colors.green
    ))

    if (Object.keys(this.command.state.parameters.options).length > 0) {
      help.push(Colors.blur('----------------------------'))

      help = help.concat(this.collectParameter(
        this.command.state.parameters.options,
        'option  ',
        Colors.blue
      ))
    }

    if (this.command.state.example) {
      help.push(Colors.blur('----------------------------'))
      help.push([
        Colors.purple('example '),
        '    ',
        this.command.state.example
      ].join(' '))
    }

    if (this.command.state.docs) {
      help.push(Colors.blur('----------------------------'))
      help.push([
        Colors.cyan('docs    '),
        '    ',
        this.command.state.docs
      ].join(' '))
    }

    this.help = help
  }
  collectParameter (params = [] , tag = '' , color = Color.white) {
    let keys = Object.keys(params)
    return keys.map((key) => {
      return [
        color(tag),
        '    ',
        params[key].name,
        params[key].description ? Colors.blur('- ' + params[key].description) : ''
      ].join(' ')
    })
  }
}

export default Help
