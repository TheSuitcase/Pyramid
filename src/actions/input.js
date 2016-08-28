import Action from '../action';

class Input extends Action{
  getInitialState(){
    return {
      exit: false
    }
  }
  actionDidUnmount(){
    this.setResponse(this.input.string)
  }
  keyboardDidFireEvent(event){
    if(event !== 'return'){
      return;
    }

    this.setState({
      exit: true
    })
  }
  actionShouldExit(){
    return this.state.exit;
  }
  render(){
    return [
      this.props[0] || 'Input:',
      this.colors.yellow(this.input.string)
    ].join(' ');
  }
}

export default Input;