import Pyramid from './index'
import State from './state'
import Actions from './actions'
import Uid from 'thesuitcase-uid'

let Executer = {
  callbackIds: [],
  queue: undefined,
  command: undefined,

  start(command) {
    if (!command) {
      this.queue = State.queue
      State.queue.isActive = true
    } else {
      State.queue.isActive = true
      let merged = State.queue.merge(command.state.queue)
      this.queue = merged
      State.queue = merged
      command.state.queue = merged
      this.command = command
    }

    if (State.welcome) {
      Pyramid.log(State.welcome)
    }

    this.next()
  },

  next() {
    if (this.queue.queue.length === 0) {
      // The queue is active, so the queue will add the 
      // action to the front of the queue. 
      // Therefore we must add the exit action
      // before the goodby log.
      Pyramid.exit()

      if (State.goodby) {
        Pyramid.log(State.goodby)
      }

      this.next()
      return
    }

    let item = this.queue.queue[0]

    if (!Actions.actions[item.action]) {
      this.next()
      return
    }

    Actions.actions[item.action]({
      pyramid: Pyramid,
      command: this.command,
      args: item.args || [],
      cb: this.actionDidFinish.bind(this)
    })
  },
  actionDidFinish(answer) {
    let item = this.queue.queue.splice(0, 1)[0]

    // Ignore these event to preven clutering the action listener.
    if (['log', 'error', 'warning', 'success'].indexOf(item.action) > -1) {
      this.next()
      return
    }

    if (item.cb) {
      item.cb(answer, this.userNext.bind(this, Uid()))
      return
    }else if (this.command && this.command._events.action) {
      this.command.emit('action', item.action, answer, this.userNext.bind(this, Uid()))
      return
    }
    this.next()
  },

  // Prevent the user/action from calling the callback twice
  userNext(id) {
    if (this.callbackIds.indexOf(id) > -1) { return; }
    this.callbackIds.push(id)

    // Prevent an every growning array.
    if (this.callbackIds.length > 500) {
      this.callbackIds = []
    }
    this.next()
  },

  bindActions(scope, queue) {
    Object.keys(Actions.actions).forEach((action) => {
      if (scope[action]) { return; }
      scope[action] = queue.addWithScope.bind(queue, scope, action)
    })
  }
}

export default Executer
