import Action from '../action';

class Log extends Action{
  constructor(){
    super();

    setInterval(() => {
      let exit = false;
      if(this.state.count > 5){
        exit = true;
      }

      this.setState({
        count: this.state.count + 1,
        exit,
      });
    }, 500)
  }
  getInitialState(){
    return {
      count: 0
    }
  }
  actionShouldExit(){
    return this.state.exit;
  }
  render(){
    return `Log action:.... ${this.state.count}`;
  }
}

export default Log;