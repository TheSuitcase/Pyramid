import State from '../state'
import RenderEngine from '../renderengine'
import Typeof from '../util/typeof'

import Log from './defaults/log'
import Wait from './defaults/wait'
import Confirm from './defaults/confirm'
import Checkbox from './defaults/checkbox'
import ErrorAction from './defaults/error'

let Actions = {
  irremovable: [],
  actions: {
    log: Log,
    error: ErrorAction,
    wait: Wait,
    confirm: Confirm,
    checkbox: Checkbox
  },
  collectIrremovableActions() {
    this.irremovable = Object.keys(this.actions)
  },
  add(actions, action) {
    if (Typeof(actions, 'string')) {
      actions = {[actions]: action}
    }

    let keys = Object.keys(actions)

    keys.forEach((name) => {
      if (this.irremovable.indexOf(name) > -1) { return false; }
      this.actions[name] = actions[name]
    })

    return true
  },
  remove(...actions) {
    actions.forEach((action) => {
      if (Typeof(action, 'array')) {
        Actions.remove(action)
        return
      }
      if (!this.actions[action]) { return false; }
      if (this.irremovable.indexOf(action) > -1) { return false; }
      delete this.actions[action]
    })
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

Actions.collectIrremovableActions()

export default Actions
