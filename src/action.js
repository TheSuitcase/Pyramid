import Runtime from './runtime';
import Colors from './colors';

class Action{
  constructor(){
    this.state = {};
    this.colors = Colors;
    this.response = undefined;

    if(this.getInitialState){
      this.state = this.getInitialState();
    }
  }

  setResponse(response){
    this.response = response;
  }

  setState(data){
    Object.assign(this.state, data);

    if(Runtime.renderEngine){
      Runtime.renderEngine.render()
    }
  }
}
export default Action;