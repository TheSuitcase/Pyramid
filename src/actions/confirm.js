import Action from '../action'

class Confirm extends Action {
  actionDidUnmount () {
    this.setResponse(this.state.confirm)
  }
  getInitialState(){
    return {
      exit: false
    }
  }
   keyboardDidFireEvent(event){
    if(event !== 'return'){
      return;
    }

    this.setState({
      exit: true
    })
  }
  userInputDidUpdate (char) {
    if (char === -1) { return }
    char = char.toLowerCase()

    if (char === 'y') {
      this.setState({confirm: true})
    }else if (char === 'n') {
      this.setState({confirm: false})
    }

    this.input.clear()
  }
  keyboardDidFireEvent (event) {
    if(event !== 'return'){
      return;
    }
    
    let confirmed = this.state.confirm;
    if(confirmed === undefined){
      confirmed = false;
    }

    this.setState({
      confirmed,
      exit: true
    })
  }
  actionShouldExit () {
    return this.state.exit || false
  }
  render () {
    let confirm

    if (this.state.confirm === true) {
      confirm = ' Yes'
    } else if (this.state.confirm === false) {
      confirm = ' No'
    } else {
      confirm = ''
    }
    return (this.props[0] || 'Are you sure?') + ' [Y/n]' + this.colors.yellow(confirm);
  }
}

export default Confirm
