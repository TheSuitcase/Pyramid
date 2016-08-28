import EventEmitter from 'eventemitter3';
import Minimist from 'minimist';
import State from './state';
import Pyramid from './pyramid';

class Arguments extends EventEmitter{
  constructor(args = process.argv.slice(2)){
    super();

    // Used variables.
    this.command = undefined; // Command Object...

    this.originalArguments = args;
    this.processedArguments = [];

    // End result.
    this.arguments = {};
    this.options = {};
  }
  parse(){
    // Prepare the incomming data.
    this.prepare(this.originalArguments);

    // Run some checks.
    let checks = [
      this.isNotEmpty,
      this.commandIsRecognized,
      this.setCommand,
      this.requirementsAreFulFilled,
      this.parseArguments,
      this.parseOptions
    ]


    let i = 0, 
        len = checks.length,
        check,
        passedAllChecks = true;

    for(i; i < len; i++){
      check = checks[i];

      let result = check.apply(this);
      if(!result){
        passedAllChecks = false;
        break;
      }
    }

    return passedAllChecks;
  }
  prepare(args){
    let result = Minimist(args);
    this.processedArguments = result._;

    delete result._;
    this.options = result;

    return this;
  }

  setCommand(){
    this.command = State.commands[this.processedArguments[0]];

    // Abstract the command.
    this.processedArguments.splice(0,1)[0];
    return this.command ? true : false;
  }

  /*
    Checks...
   */
  isNotEmpty(){
    let valid = this.processedArguments.length === 0 ? false : true;

    if(!valid){
      Pyramid.error('Please enter a command');
    }

    return valid;
  }
  commandIsRecognized(){
    let recognized = State.commands[this.processedArguments[0]] ? true : false;

    if(!recognized){
      Pyramid.error('The command is not available!')
    }

    return recognized;
  }
  requirementsAreFulFilled(){
    if(!this.command){ return false; }
    let shouldHave = Object.keys(this.command.state.required).length;

    // Count in the command itself.
    if(this.processedArguments.length < shouldHave){
      Pyramid.log('Please enter all the required parameters!')
      return false;
    }

    return true;
  }
 
  /*
    Parse...
   */
  parseArguments(){
    // Process the leftovers.
    let results = {};

    let commandKeys = [];
    commandKeys = commandKeys.concat(Object.keys(this.command.state.required));
    commandKeys = commandKeys.concat(Object.keys(this.command.state.optional));

    let i = 0, 
        len = commandKeys.length,
        key;

    for(i; i < len; i++){
      key = commandKeys[i];
      results[key] = this.processedArguments[i];
    }

    this.arguments = results;

    return true;
  }

  /**
   * Delete unwanted options...
   * @return {[type]} [description]
   */
  parseOptions(){
    let commandOptions = Object.keys(this.command.state.options);
    let foundOptions = Object.keys(this.options);

    let i = 0, 
        len = foundOptions.length,
        key;
      
    for(i; i < len; i++){
      key = foundOptions[i];
      if(commandOptions.indexOf(key) === -1){
        delete this.options[key];
      }
    }

    return true;
  }

}


export default Arguments;