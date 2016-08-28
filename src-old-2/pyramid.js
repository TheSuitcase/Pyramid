import Debug from './debug';
import State from './state';
import _ from 'underscore';
import Runtime from './runtime';

let Pyramid = {

  /**
   * Set the debug mode. Disabled by default.
   * @param  {Boolean} bool - True = enabled, false = disabled
   * @default true
   */
  debug(bool = true){
    if(!_.isBoolean(bool)){
      Debug.error('[pyramid.debug] The argument should be a boolean!');
      return this;
    }

    State.set({debugging: bool});
    return this;
  },

  /**
   * Set the version for the cli.
   * @param  {String} version - The version number.
   */
  version(version = '0.0.0'){
    if(!_.isString(version)){
      Debug.error('[pyramid.version] The version should be a string!')
      return this;
    }

    State.set({version});
    return this;
  },

  /**
   * Set the delimiter.
   * @param  {String} delimiter - The delimiter.
   */
  delimiter(delimiter){
    if(!_.isString(delimiter)){
      Debug.error('[pyramid.delmiter] The delmiter must be a string!');
      return this;
    }

    // Append a space.
    if(delimiter[delimiter.length -1] != ' '){
      delimiter += ' ';
    }

    State.set({delimiter});
    return this;
  },

  /**
   * Create a new command.
   * @param  {String} command - The command.
   * @return {Command}         
   */
  command(command){
    if(!_.isString(command)){
      Debug.error('[pyramid.command] The command must be a string!');
      return this;
    }

    // Create and set.
    let _c = new Command(command);
    State.commands[command] = _c;
    return _c;
  },

  parse(input){
    if(!input && process && process.argv){
      input = process.argv
    }
    Runtime.parse(input);
    return this;
  },

  /***
    Callbacks
  ***/
  /**
   * Set the action callback.
   * @param  {Function} cb - Callback
   */
  action(cb){
    if(!_.isFunction(db)){
      Debug.error('[pyramid.action] The callback must be a function!');
      return this;
    }

    if(State.generalCallbacks.action){
      Debug.warn('[pyramid.action] There is already a callback registered, it will be overriden now!');
    }

    State.generalCallbacks.action = cb;
    return this;
  },

   /**
   * Set the validate callback.
   * @param  {Function} cb - Callback
   */
  validate(cb){
    if(!_.isFunction(db)){
      Debug.error('[pyramid.validate] The callback must be a function!');
      return this;
    }

    if(State.generalCallbacks.validate){
      Debug.warn('[pyramid.validate] There is already a callback registered, it will be overriden now!');
    }

    State.generalCallbacks.validate = cb;
    return this;
  },

  /**
   * Set the exit callback.
   * @param  {Function} cb - Callback
   */
  exit(cb){
    if(!_.isFunction(db)){
      Debug.error('[pyramid.exit] The callback must be a function!');
      return this;
    }

    if(State.generalCallbacks.exit){
      Debug.warn('[pyramid.exit] There is already a callback registered, it will be overriden now!');
    }

    State.generalCallbacks.exit = cb;
    return this;
  },

  /**
   * Set the overflow callback.
   * @param  {Function} cb - Callback
   */
  overflow(cb){
    if(!_.isFunction(db)){
      Debug.error('[pyramid.overflow] The callback must be a function!');
      return this;
    }

    if(State.generalCallbacks.overflow){
      Debug.warn('[pyramid.overflow] There is already a callback registered, it will be overriden now!');
    }

    State.generalCallbacks.overflow = cb;
    return this;
  }

};

export default Pyramid;