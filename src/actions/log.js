import Action from '../action';

class Log extends Action{
  actionShouldExit(){
    return true;
  }
  render(){
    return `${this.colors.red('+')} ${this.props.join('')}`;
  }
}

export default Log;