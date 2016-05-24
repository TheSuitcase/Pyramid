'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _action = require('../action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wait = (function (_Action) {
  _inherits(Wait, _Action);

  function Wait() {
    _classCallCheck(this, Wait);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Wait).apply(this, arguments));
  }

  _createClass(Wait, [{
    key: 'initialState',
    value: function initialState() {
      return {
        exit: false,
        input: '',
        events: []
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ count: 0 });
      // this.interval = setInterval(() => {

      //   if (this.state.count >= 10) {
      //     this.setState({exit: true})
      //     return
      //   }

      //   this.setState({count: this.state.count + 1})
      // }, 100)
    }
  }, {
    key: 'userInputDidUpdate',
    value: function userInputDidUpdate(char) {
      this.setState({ count: this.state.count + 1 });
      if (this.state.count + 1 > 10) {
        this.setState({ exit: true });
      }
      // console.log('userInputDidUpdate', char)
      // this.setState({exit: true}) // input: this.state.input + char})
    }
  }, {
    key: 'userInputDidFireEvent',
    value: function userInputDidFireEvent(event) {
      // console.log('userInputDidFireEvent', event)
      // let events = this.state.events
      // events.push(event)
      // this.setState({events})
    }
  }, {
    key: 'componentDidUnmount',
    value: function componentDidUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: 'componentShouldExit',
    value: function componentShouldExit() {
      return this.state.exit || false;
    }
  }, {
    key: 'render',
    value: function render() {
      return ['[' + this.state.count + ']' + this.input.string];
    }
  }]);

  return Wait;
})(_action2.default);

exports.default = Wait;