class Arguments {
  constructor (command) {
    this.command = command

    this.required = {}
    this.optional = {}
    this.options = {}

    this.errors = []
  }
  generate (args = []) {
    let clonedArgs = args.map((arg) => {
      return arg
    })

    this.collectRequiredArguments(clonedArgs)

    // Checkpoint!
    if (this.errors.length > 0) {
      return this
    }

    this.collectOptionalArguments(clonedArgs)

    // Checkpoint!
    if (this.errors.length > 0) {
      return this
    }

    this.collectionOptions(clonedArgs)
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

    let arg, input
    for (let i = 0; i < len; i++) {
      arg = params[keys[i]]
      input = args.splice(0, 1)[0]

      // Validate the input when the developer has given us
      // an validate callback
      if (arg.validate) {
        let valid = arg.validate(input)

        if (!valid) {
          this.errors.push(`The argument ${input} is invalid!`)
          return
        }else if (valid !== true) {
          this.errors.push(valid)
          return
        }
      }

      this.required[arg.name] = input
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

    let arg, input
    for (let i = 0; i < len; i++) {
      arg = params[keys[i]]

      // Stop a soon as we find an option.
      if (args[0] && args[0].indexOf('-') > -1) {
        return
      }

      input = args.splice(0, 1)[0]

      // Validate the input when the developer has given us
      // an validate callback
      if (arg.validate) {
        let valid = arg.validate(input)

        if (!valid) {
          this.errors.push(`The argument ${input} is invalid!`)
          return
        }else if (valid !== true) {
          this.errors.push(valid)
          return
        }
      }

      this.optional[arg.name] = input
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
    let pos, input, validInput

    keys.forEach((key) => {
      option = params[key]
      pos = args.indexOf(option.name)
      input = args[pos + 1]
      validInput = undefined

      if (pos > -1) {
        if (!option.value) {
          validInput = true
        }

        if (input && input.indexOf('-') === -1) {
          validInput = input
        } else {
          this.errors.push(`The option ${option.name} is missing a value!`)
          return
        }

        // Validate the input when the developer has given us
        // an validate callback
        if (validInput !== false && option.validate) {
          let valid = option.validate(input)

          if (!valid) {
            this.errors.push(`The argument ${input} is invalid!`)
            return
          }else if (valid !== true) {
            this.errors.push(valid)
            return
          }
        }

        // Store the input
        if (validInput) {
          this.options[option.name] = validInput
        }
      }
    })
  }
}

export default Arguments
