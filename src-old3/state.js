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
  version: '0.0.0',

  delimiter: '$ ',
})
