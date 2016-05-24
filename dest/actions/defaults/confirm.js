'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _action = require('../action');

var _action2 = _interopRequireDefault(_action);

var _colors = require('../../colors');

var _colors2 = _interopRequireDefault(_colors);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Confirm = (function (_Action) {
  _inherits(Confirm, _Action);

  function Confirm() {
    _classCallCheck(this, Confirm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Confirm).apply(this, arguments));
  }

  _createClass(Confirm, [{
    key: 'userInputDidUpdate',
    value: function userInputDidUpdate(char) {
      if (char === -1) {
        return;
      }
      char = char.toLowerCase();

      if (char === 'y') {
        this.setState({ confirm: true });
      } else if (char === 'n') {
        this.setState({ confirm: false });
      }

      this.input.clear();
    }
  }, {
    key: 'userInputDidFireEvent',
    value: function userInputDidFireEvent(event) {
      if (event === 'return') {
        this.setState({ exit: true });
      }
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
      var confirm = undefined;

      if (this.state.confirm === true) {
        confirm = ' Yes';
      } else if (this.state.confirm === false) {
        confirm = ' No';
      } else {
        confirm = '';
      }
      return [(this.props[0] || 'Are you sure?') + '[Y/n]' + _chalk2.default.cyan(confirm)];
    }
  }]);

  return Confirm;
})(_action2.default);

exports.default = Confirm;