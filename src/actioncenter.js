import log from './actions/log';
import error from './actions/error';
import input from './actions/input';
import confirm from './actions/confirm';

let ActionCenter = {
  actions: {
    log, error, input, confirm
  },

  add(name, fn){
    this.actions[name] = fn;
  },

  remove(name){
    if(!this.actions[name]){ return; }
    delete this.actions[name];
  },


  merge(scope, queue){
    let keys = Object.keys(this.actions);
    let i = 0, 
        len = keys.length,
        key;

    for(i; i < len; i++){
      key = keys[i];
      scope[key] = this.addActionToQueue.bind(this, this.actions[key], queue, scope);
    }

  },

  addActionToQueue(action, queue, scope, ...args){
    queue.push({action, args});
    return scope;
  }
};

export default ActionCenter;