import EventEmitter from 'events';
import _ from 'underscore';
import State from './state';

import RunTime from './runtime';
import Command from './command';

let ee = new EventEmitter();

let Pyramid = {
  State,
  on: ee.on.bind(ee),

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

  parse(){
    RunTime.parse()
    return this;
  }
};


export default Pyramid;
module.exports = Pyramid;