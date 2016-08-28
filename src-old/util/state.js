import Util from 'util'
import Typeof from './typeof'

class State {
  constructor (state) {
    this.set(state)
  }
  /*
    Support:
      level 1 - every type
      level 2 - string, object, boolean

    Note: arrays will be replaced instead of merged!
          object will be merged instead of replaced!
   */
  set (data) {
    if (!Util.isObject(data)) {
      return
    }

    let keys = Object.keys(data)

    let i = 0, len = keys.length
    let item

    for (i; i < len; i++) {
      item = data[keys[i]]

      if (Util.isObject(item)) {
        // Filter out classes.
        if ([
            'Object', 'Boolean', 'String', 'Array'
          ].indexOf(item.constructor) === -1) {
          this[keys[i]] = item
          continue
        }

        if (!this[keys[i]]) {
          this[keys[i]] = {}
        }

        Object.assign(this[keys[i]], item)
      } else {
        this[keys[i]] = item
      }
    }

    return this
  }
}

export default State
