import EventEmitter from 'eventemitter3';
import _ from 'underscore';
import Debug from './debug';
import State from './state';
import Command from './command';
import ActionCenter from './actioncenter';
import Queue from './queue';

let ee = new EventEmitter();

let Pyramid = {
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

    State.debugging = bool;
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

    State.version = version;
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

    State.delimiter = delimiter;
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
  }
};

ActionCenter.merge(Pyramid, Queue);

export default Pyramid;
module.exports = Pyramid;