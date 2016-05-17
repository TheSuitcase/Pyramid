import Chalk from 'chalk'
import Queue from './Queue'

let state = {
  queue: new Queue(),
  version: undefined,
  directories: [],
  commands: {},
  autocomplete: true,
  color: {
    default: undefined,
    error: undefined,
    warning: undefined,
    success: undefined,
  },
  delimiter: {
    default: undefined,
    error: undefined,
    warning: undefined,
    success: undefined,
  },
  welcome: undefined,
  goodby: undefined,
  callbacks: {
    overflow: undefined,
    ui: undefined,
    action: undefined,
  },

  getDelimiter(type = 'default') {
    let delimiter = this.delimiter[type] || this.delimiter.default
    let color = this.color[type] || this.color.default
    return Chalk[color](delimiter)
  }
}

export default state
module.exports = state
