import State from '../state'
import RenderEngine from '../renderengine'

import Log from './defaults/log'
import Wait from './defaults/wait'
import Confirm from './defaults/confirm'
import Checkbox from './defaults/checkbox'

let Actions = {
  actions: {
    log: Log,
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
  },
  execute(command) {
    // Merge command an state queue.
    if (command) {
      State.actions.merge(command.state.actions)
    }
    // console.log(State.actions)
    RenderEngine.start()
  }
}

export default Actions
