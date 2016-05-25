class Arguments {
  constructor (command) {
    this.command = command

    this.required = {}
    this.optional = {}
    this.options = {}

    this.errors = []
  }
  generate (args = []) {
    this.collectRequiredArguments(args)
    this.collectOptionalArguments(args)
    this.collectionOptions(args)
    return this
  }
  collectRequiredArguments (args) {
    // Clear out the old.
    this.required = {}

    let params = this.command.state.parameters.required
    let keys = Object.keys(params)
    let len = keys.length

    if (len === 0) {
      return
    }

    if (len > args.length) {
      this.errors.push('Please enter all the required arguments!')
      return
    }

    let arg
    for (let i = 0; i < len; i++) {
      arg = params[keys[i]]
      this.required[arg.name] = args.splice(0, 1)[0]
    }
  }

  collectOptionalArguments (args) {
    this.optional = {}

    let params = this.command.state.parameters.optional
    let keys = Object.keys(params)
    let len = keys.length

    if (len === 0) {
      return
    }

    let arg
    for (let i = 0; i < len; i++) {
      arg = params[keys[i]]

      // Stop a soon as we find an option.
      if (args[0] && args[0].indexOf('-') > -1) {
        return
      }

      this.optional[arg.name] = args.splice(0, 1)[0]
    }
  }
  collectionOptions (args) {
    this.options = {}

    let params = this.command.state.parameters.options
    let keys = Object.keys(params)

    if (keys.length === 0) {
      return
    }

    let option
    let pos

    keys.forEach((key) => {
      option = params[key]
      pos = args.indexOf(option.name)

      if (pos > -1) {
        if (!option.value) {
          this.options[option.name] = true
          return
        }

        if (args[pos + 1] && args[pos + 1].indexOf('-') === -1) {
          this.options[option.name] = args[pos + 1]
          return
        }

        this.errors.push(`The option ${option.name} is missing a value!`)
      }
    })
  }
}

export default Arguments
