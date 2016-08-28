import State from './state';
import Colors from './colors';

let Log = {
  log(msg){
    console.log(State.delimiter + msg);
  },
  error(msg){
    console.log(State.delimiter + Colors.red(msg));
  }
}

export default Log;