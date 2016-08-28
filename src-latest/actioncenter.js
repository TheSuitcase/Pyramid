import log from './actions/log';

let ActionCenter = {
  actions: {
    log,
  },

  mergeWithCommand(scope, queue){
    let keys = Object.keys(this.actions);
    let i = 0,
        len = keys.length,
        actionName;

    for(i; i < len; i++){
      actionName = keys[i];
      scope[actionName] = queue.addWithScope.bind(queue, scope, this.actions[actionName])
    }

    return this;
  }
}

export default ActionCenter;