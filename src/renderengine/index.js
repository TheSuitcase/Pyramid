import EventEmitter from 'events';
import Readline from './readline';
import Keyboard from './keyboard';
import _ from 'underscore';
import State from '../state';
import Input from './input';

import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import Screen from './screen';

// Setup.
class RenderEngine extends EventEmitter{
  constructor(queue){
    super();

    this.queue = queue;
    this.hasFinishedCycle = false;
    this.listeners = {};
    this.responses = [];

    // The currently active action.
    this.action = undefined; 

    this.setupKeyboard();

    process.nextTick(() => {
      this.render();
    });
  }

  /*
    Keyboard
   */
  setupKeyboard(){
    this.listeners = {
      keyboardDidFireChar: this.keyboardDidFireChar.bind(this),
      keyboardDidFireEvent: this.keyboardDidFireEvent.bind(this)
    }

    // Fire up the keyboard.
    Keyboard.on('char', this.listeners.keyboardDidFireChar.bind(this))
    Keyboard.on('backspace', this.keyboardDidFireChar.bind(this))
    Keyboard.on('event', this.keyboardDidFireEvent.bind(this))
  }

  keyboardDidFireChar(char){
    if(!this.action){ return; }
    if(!char){ char = -1; } // -1 means backspace!

    // Update the input
    if (char === -1) {
      this.action.input.pop()
    } else {
      this.action.input._data.push(char)
    }

    // Notify the currently active action.
    if (char && this.action.userInputDidUpdate) {
      this.action.userInputDidUpdate(char)
    }

    // Rerender action.
    this.render();
  }

  keyboardDidFireEvent(event) {
    if(!this.action) { return; }
    if(!event){ return; }

    // Notify the currently active action.
    if(this.action.keyboardDidFireEvent) {
      this.action.keyboardDidFireEvent(event)
    }

    // Rerender the action.
    this.render()
  }

  /*
    Action
   */
  setAction(){
    // Clear the current action.
    if(this.action){ this.clearAction(); }

    // Goto the new action.
    if(this.queue.length === 0){ return; }

    let item = this.queue.splice(0,1)[0];
    let _class = item.action;
    let args = item.args;

    // Create a new instance of the action.
    this.action = new _class();
    this.action.props = args;
    this.action.input = new Input();

    if(!this.action.render){
      this.setAction();
    }

    return this;
  }

  clearAction(){
    if(!this.action){ return; }
    if(this.action && this.action.actionDidUnmount){
      this.action.actionDidUnmount();
    }
    this.responses.push(this.action.response);

    delete this.action;
  }

  /*
    Render
   */
  render(){

    // Pre-render checks
    if(!this.action || !this.action.render){
      this.setAction();
    }

    if(!this.action){
      this.exit();
      return;
    }

    // Clear lastknow output.
    if(this.lastKnownOutput){
      let lines = 0;

      if(_.isArray(this.lastKnownOutput)){
        lines = this.lastKnownOutput.length + 1;
      }

      Screen.clearLine(lines);
    }
    
    // Start rendering...
    let output = this.action.render();

    if(_.isString(output)){
      output = [output]
    }else if(!_.isArray(output)){
      output = [output.toString()]
    }

    // Store the current output for later.
    this.lastKnownOutput = output;

    // // Check if we should exit this action.
    let exit = false;
    if(!this.action.actionShouldExit){
      exit = true;
    }else if(this.action.actionShouldExit() === true){
      exit = true;
    }

    // // Exit if necessary.
    if(exit && this.exitOnFirstRender === undefined){
      this.exitOnFirstRender = true;
    }else{
      this.exitOnFirstRender = false;
    }

    // // Prepend the delimiter to the output.
    output.forEach((line) => {
      process.stdin.write(State.delimiter + line);
    })

    // out
    // process.stdin.write(output);
    // if(output.length === 1){
      process.stdin.write('\n')
    // }

    if(exit){
      this.clearAction();
      this.render();
    }
  }

  write(output){
    process.stdout.write(output);
  }

  exit(){
    if(this.hasFinishedCycle){ return; }
    this.clearAction();
    this.hasFinishedCycle = true;

    this.emit('exit');
  }
}

export default RenderEngine;