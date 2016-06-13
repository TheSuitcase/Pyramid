'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _action = require('../action');

var _action2 = _interopRequireDefault(_action);

var _state = require('../../state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = (function (_Action) {
  _inherits(Autocomplete, _Action);

  function Autocomplete() {
    _classCallCheck(this, Autocomplete);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Autocomplete).apply(this, arguments));
  }

  _createClass(Autocomplete, [{
    key: 'componentShouldExit',
    value: function componentShouldExit() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var command = _state2.default.command.state.parameters;

      var suggestions = [];
      var keys = Object.keys(command.optional);

      keys.forEach(function (key) {
        if (command.optional[key].autocomplete) {
          suggestions = suggestions.concat(command.optional[key].autocomplete);
        }
      });

      return ['Autocomplete:' + this.input.string, 'Suggestions:' + suggestions.join(', ')];
    }
  }]);

  return Autocomplete;
})(_action2.default);

exports.default = Autocomplete;