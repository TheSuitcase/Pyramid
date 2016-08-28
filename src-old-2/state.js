import State from './util/state';

export default new State({
  debugging: false,
  delimiter: '$ ',

  commands: {},

  
  generalCallbacks:{
    action: undefined,
    overflow: undefined,
    exit: undefined,
    validate: undefined
  }
});
