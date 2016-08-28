import Action from '../action';

class Error extends Action{
  actionShouldExit(){
    return true;
  }
  render(){
    return `${this.colors.red('x')} ${this.props.join('')}`;
  }
}

export default Error;