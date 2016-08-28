import Colors from './colors'
import Util from 'util'
import State from './util/state'
import Queue from './util/queue'

export default new State({
  responses: [],
  callbacks: {
    action: undefined,
    exit: undefined,
    validate: undefined,
  },

  actions: new Queue(),
  errors: [],

  command: undefined,
  commands: {},

  // User settings
  help: true,
  autocomplete: false,
  version: '0.0.0',

  delimiter: {
    default: '',
    error: undefined,
    success: undefined,
    warning: undefined,
  },
  colors: {
    default: Colors.yellow,
    text: Colors.white,
    error: Colors.red,
    success: Colors.green,
    warning: Colors.yellow,
    blur: Colors.gray,
    hightlight: Colors.yellow
  }
})
