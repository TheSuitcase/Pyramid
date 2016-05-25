import Typeof from '../util/typeof'
import Util from 'util'
import RegexParameterFunction from '../util/regexParameter'

class Parameters {
  constructor (command) {
    this.command = command

    this.errors = []
    this.required = {}
    this.optional = {}
    this.options = {}

    return this
  }
  parse (type, args) {
    switch (type) {
      case 'required':
        this.processParameter(this.required, args)
        break
      case 'optional':
        this.processParameter(this.optional, args)
        break
      case 'option':
        this.addOption(this.options, args)
        break
    }
  }

  processParameter (store, args) {
    // Support for multiple entries.
    // args: Object, undefined
    if (Util.isObject(args[0])) {
      let keys = Object.keys(args[0])

      keys.forEach((key) => {
        this.processParameter(store, [key, args[key]])
      })
      return this
    }

    // Support of single entries.
    let result = {
      description: undefined
    }

    let errors = []

    // Hanle the first argument
    switch (Typeof(args[0])) {
      case 'string':
        result.name = args[0]
        break
      default:
        errors.push('The first argument must be either a string or an object!')
        return {error, result}
    }

    // Handle the seconds argument
    switch (Typeof(args[1])) {
      case 'string':
        result.description = args[1]
        break
      case 'object':
        Object.assign(result, args[1])
        break
      default:
        errors.push('The first argument must be either a string or an object!')
        return
    }

    // Validate the input
    result.name = result.name.replace(' ', '')

    // Name must be a string otherwise we cancel this attempt.
    if (!Typeof(result.name, 'string')) {
      errors.push({
        command: this.command,
        type: 'name',
        message: 'The name must be a string!'
      })
      return
    }

    // Description and validation can be faulty,
    // they will be removed from the result.
    if (result.description !== undefined && !Typeof(result.description, 'string')) {
      delete result.description
      errors.push({
        command: this.command,
        type: 'description',
        message: 'The description must be a string!'
      })
    }

    if (result.validate !== undefined && !Typeof(result.validate, 'function', 'regexp')) {
      delete result.validate
      errors.push({
        command: this.command,
        type: 'validate',
        message: 'The validate field must be a regex or a function!'
      })
    } else {
      if (Typeof(result.validate, 'regexp')) {
        result.validate = RegexParameterFunction.bind(null, result.validate)
      }
    }

    // Store the newly gained errors.
    this.errors = this.errors.concat(errors)

    if (store[result.name]) {
      Object.assign(store[result.name], result)
    } else {
      store[result.name] = result
    }

    return
  }

  addOption (store, args) {
    let items = []

    switch (Typeof(args[0])) {
      case 'string':
        items.push([args[0], args[1]])
        break
      case 'object':
        let keys = Object.keys(args[0])

        keys.forEach((key) => {
          items.push([key, args[0][key]])
        })
        break
    }

    let names
    items.forEach((item) => {
      names = item[0].split(' ')

      if (Util.isString(item[1])) {
        item[1] = {description: item[1]}
      }

      item[1].siblings = names

      names.forEach((name) => {
        this.processParameter(store, [name, item[1]])
      })
    })

    return
  }

}

export default Parameters
