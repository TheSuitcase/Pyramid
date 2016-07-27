'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _action = require('../action');

var _action2 = _interopRequireDefault(_action);

var _colors = require('../../colors');

var _colors2 = _interopRequireDefault(_colors);

var _state = require('../../state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = (function (_Action) {
  _inherits(Input, _Action);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'initialState',
    value: function initialState() {
      return {
        input: ''
      };
    }
  }, {
    key: 'componentDidUnmount',
    value: function componentDidUnmount() {
      console.log('componentDidUnmount', this.state.input);
      this.setResponse(this.state.input);
    }
  }, {
    key: 'userInputDidUpdate',
    value: function userInputDidUpdate(char) {
      if (char === -1) {
        return;
      }
      char = char.toLowerCase();
      this.setState({ input: this.state.input + char });
    }
  }, {
    key: 'userInputDidFireEvent',
    value: function userInputDidFireEvent(event) {
      if (event === 'return' && this.state.input !== undefined) {
        this.setState({ exit: true });
      }
    }
  }, {
    key: 'componentShouldExit',
    value: function componentShouldExit() {
      return this.state.exit || false;
    }
  }, {
    key: 'render',
    value: function render() {
      return [this.getDelimiter() + (this.props[0] || 'Input:') + this.state.input];
    }
  }]);

  return Input;
})(_action2.default);

exports.default = Input;