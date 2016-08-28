import Minimist from 'minimist';
import State from './state';
import RenderEngine from './renderengine';

let Runtime = {
  parse(){
    let args = process.argv.slice(2);
    args = Minimist(args);

    // No command entered.
    if(args._.length === 0){
      console.log('Empty.... Please show the help!');
      this.exit();
      return;
    }
     
    let command = args._[0];
    command = State.commands[command];

    // Check is the command exists.
    if(!command){
      console.log('Please enter a command and show the help!');
      this.exit();
      return;
    }

    // Parse the arguments....
    let minRequired = Object.keys(command.state.required).length;
    if(args._.length - 1 < minRequired){
      console.log('Please enter all the required arguments! and show help/syntax!');
      this.exit();
      return;
    }

    // Runtime
    RenderEngine.start(command.state.actions);

    console.log(args);
  },

  exit(){
    process.exit();
  }
}

export default Runtime;