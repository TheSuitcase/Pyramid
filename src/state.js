import Colors from './colors'
import Util from 'util'
import State from './util/state'

export default new State({
  actions: [],
  errors: [],

  command: undefined,
  commands: {},

  // User settings
  help: true,
  autocomplete: false,
  version: '0.0.0',

  delimiters: {
    default: '',
    error: undefined,
    success: undefined,
    warning: undefined,
  },
  colors: {
    text: Colors.white,
    error: Colors.red,
    success: Colors.green,
    warning: Colors.yellow,
    blur: Colors.gray,
    hightlight: Colors.yellow
  }
})
