import EventEmitter from 'events';
import Readline from './readline';
import ScreenManager from './screenmanager';
import Keyboard from './keyboard';

let ee = new EventEmitter();

let RenderEngine = {
  on: ee.on.bind(ee),
  emit: ee.emit.bind(ee),
  screenManager: new ScreenManager(Readline),

  isActive: false,
  queue: undefined,
  action: undefined, // The currently active action.

  setup(){
    this.listeners = {
      keyboardDidFireChar: this.keyboardDidFireChar.bind(this),
      keyboardDidFireEvent: this.keyboardDidFireEvent.bind(this)
    }
  },

  start(queue){
    // Prevent interrupting a running process.
    if(this.isActive){ return; }

    // Reset the base values.
    this.queue = queue.queue;
    this.active = true;
    this.responses = [];

    // Fire up the keyboard.
    Keyboard.on('char', this.listeners.keyboardDidFireChar.bind(this))
    Keyboard.on('backspace', this.keyboardDidFireChar.bind(this))
    Keyboard.on('event', this.keyboardDidFireEvent.bind(this))

    this.render();
    return this;
  },

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
  },

  keyboardDidFireEvent(event) {
    if(!this.action) { return; }
    if(!event){ return; }

    // Notify the currently active action.
    if(this.action.userInputDidFireEvent) {
      this.action.userInputDidFireEvent(event)
    }

    // Rerender the action.
    this.render()
  },

  RenderEngineIsFinishedRendering(){
    this.emit('finished');
  },

  setAction(){
    if(this.action){
      this.closeAction();
    }

    console.log(this.queue);
    let actionClass = this.queue.splice(0,1);
    console.log(actionClass)
    // this.action = new actionClass();

    return this;
  },

  closeAction(){
    this.action = undefined;
    return;
  },

  runPreRenderChecks(){
    // Check if action is available.
    if(!this.action){
      this.setAction();
    }

    // No more action left to execute!
    if(!this.action){
      this.RenderEngineIsFinishedRendering()
      return false;
    }


    return true;
  },

  render(){
    let valid = this.runPreRenderChecks();
    if(!valid){ return; }

    


  }


}


RenderEngine.setup();

export default RenderEngine;