import Log from './log';

let Runtime = {
  exit(){
    process.exit()
  },

  parse(input){
    // Prepare the input.
    input = this.prepareInput(input);

    // Check if input is valid.
    let valid = this.isInputValid(input);

    if(valid !== true){
      Log.error(valid);
      this.exit();
      return this;
    }

    // Find a matching command.
    let command = this.findMatchingCommand(input);

    // if(!command){}




  },
  /**
   * Remove unimportant arguments.
   * @param  {Array} input 
   * @return {Array}       
   */
  prepareInput(input){
    if (input === process.argv) {
      // Remove the two unimportant arguments
      // without destroying the orignal process.argv
      input = input.slice(2, input.length)
    }
    return input;
  },
  /**
   * Filter out uninteresting input attempts.
   * @param  {[type]} input [description]
   * @return {[type]}       [description]
   */
  isInputValid(input) {
    if (input.length === 0) {
      return 'Please enter a command!';
    }else if (input.length > 40) {
      return 'Your command contains to many arguments!';
    }
    return true
  }


}

export default Runtime;