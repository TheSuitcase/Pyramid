import State from '../state'

let logger = {
  write({command, pyramid, type, args, cb}) {
    args = args.map((line) => {
      return State.getDelimiter(type) + ' ' + line
    })

    console.log(args.join('\n'))
    cb()
  },
  log(api) {
    api.type = 'log'
    logger.write(api)
  },
  error(api) {
    api.type = 'error'
    logger.write(api)
  },
  success(api) {
    api.type = 'success'
    logger.write(api)
  },
  warning(api) {
    api.type = 'warning'
    logger.write(api)
  },
  linebreak(api) {
    // Create a linebreak without delimiter
    if (api.args[0] === false) {
      console.log('')
      api.cb()
      return
    }

    // With delimiter
    api.args = ['']
    logger.write(api)
  }
}

export default logger
