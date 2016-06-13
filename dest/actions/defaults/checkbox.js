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

var _state = require('../../state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = (function (_Action) {
  _inherits(Checkbox, _Action);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'initialState',
    value: function initialState() {
      return {
        position: 0,
        checked: -1
      };
    }
  }, {
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
      var position = this.state.position;

      if (event === 'return') {
        this.setState({ exit: true, checked: position });
      } else if (event === 'up') {
        position--;
      } else if (event === 'down') {
        position++;
      }

      if (position > this.props.length - 1) {
        position = this.props.length - 1;
      } else if (position < 0) {
        position = 0;
      }

      this.setState({ position: position });
    }
  }, {
    key: 'componentDidUnmount',
    value: function componentDidUnmount() {}
  }, {
    key: 'componentShouldExit',
    value: function componentShouldExit() {
      this.setResponse(this.state.checked);
      return this.state.exit || false;
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      var items = [];

      this.props.forEach(function (item, pos) {
        items.push(['- [', _state2.default.colors.default(_this2.state.position === pos ? 'x' : ' '), ']', ' ' + item].join(''));
      });

      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var output = [this.getDelimiter() + 'Checkboxes: (Use your `up` and `down` keys to navigate)'];

      output = output.concat(this.renderItems());

      return this.state.exit ? this.getDelimiter() + 'Checkboxes: ' + _state2.default.colors.default(this.props[this.state.position]) : output;
    }
  }]);

  return Checkbox;
})(_action2.default);

exports.default = Checkbox;