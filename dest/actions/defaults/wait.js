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
        time: 2, // in seconds.
        current: 0,
        output: []
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var time = this.props[0] || 2;

      this.setState({ time: time });

      this.interval = setInterval(function () {

        var current = _this2.state.current;
        var output = _this2.state.output;

        if (current < _this2.state.time) {
          current++;

          output.push(_this2.getDelimiter() + ('Wait ' + (time - current) + ' seconds!'));
          _this2.setState({ current: current, output: output });
        } else {
          _this2.setState({ exit: true });
        }
      }, 1000);
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
      var output = [];
      if (this.state.exit) {
        output = [this.getDelimiter() + ('You waited ' + this.state.time + ' seconds!')];
      } else {
        output.push(this.getDelimiter() + ('You just have to wait ' + this.state.time + ' seconds!'));

        output = output.concat(this.state.output);
      }
      return output;
    }
  }]);

  return Wait;
})(_action2.default);

exports.default = Wait;