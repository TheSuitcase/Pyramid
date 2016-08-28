import Minimist from 'minimist';

// import Pyramid from './pyramid';
// import RenderEngine from './renderengine';
// import ActionCenter from './actioncenter';


import Arguments from './arguments';

class Runtime {
  constructor(){

    // Collecting bin for all the actions...
    this.queue = [];

    /*
      Arguments
     */
    // Prepare
    this.args = this.prepareRunTimeArguments();

    // Validate
    this.validateRunTimeArguments();



  }

  /**
   * Prepare process.argv for processing.
   * @return {[type]} [description]
   */
  prepareRunTimeArguments(){
    let args = process.argv.slice(2);
    args = Minimist(args);
    return args;
  }

  validateRunTimeArguments(){

    // No command found.
    if(this.args.length === 0){
      Action
        .log('You must enter a command!')
        .help()
        .exit()
      return;
    }

    // 
  }
}





// Parse.
Pyramid.parse = () => {
  new Runtime();
}

export default Pyramid;