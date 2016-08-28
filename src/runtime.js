import Arguments from './arguments';
import RenderEngine from './renderengine';
import Queue from './queue';

let Runtime = {
  start(){

    // Collecting bin for all the actions...
    let queue = [];

    /*
      Arguments
     */
    this.args = new Arguments();
    let valid = this.args.parse();

    /*
      Render Engine
     */
    if(valid){
      queue = Queue.concat(this.args.command.state.queue);
    }else{
      queue = Queue;
    }
console.log(queue);
    this.renderEngine = new RenderEngine(queue);

    this.renderEngine.on('exit', () => {
      console.log(this.args.arguments, this.args.options, this.renderEngine.responses);
      this.exit();
    })
  },
  exit(){
    process.exit();
  }

}

export default Runtime;