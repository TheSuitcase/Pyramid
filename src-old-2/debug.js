import State from './state';

let Debug = {

  log(...args){
    if(!State.debugging){ return; }
    console.log(args.join(''));
  },

  error(...args){
    if(!State.debugging){ return; }
    console.log(args.join(''));
  },

  warn(...args){
    if(!State.debugging){ return; }
    console.log(args.join(''));
  },




};


export default Debug;