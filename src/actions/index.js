import State from '../state'
import RenderEngine from '../renderengine'

import Log from './defaults/log'
import Wait from './defaults/wait'
import Confirm from './defaults/confirm'
import Checkbox from './defaults/checkbox'
import ErrorAction from './defaults/error'

let Actions = {
  actions: {
    log: Log,
    error: ErrorAction,
    wait: Wait,
    confirm: Confirm,
    checkbox: Checkbox
  },
  add(name, action) {
    this.actions[name] = action
    return true
  },
  remove(name) {
    if (!this.actions[name]) { return false; }
    delete this.actions[name]
    return true
  },
  merge(scope, queue) {
    let keys = Object.keys(this.actions)

    keys.forEach((key) => {
      if (scope[key]) {
        return
      }

      scope[key] = queue.addWithScope.bind(queue, scope, this.actions[key])
    })
  }
}

export default Actions
