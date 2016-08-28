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

var Log = (function (_Action) {
  _inherits(Log, _Action);

  function Log() {
    _classCallCheck(this, Log);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Log).call(this));

    setInterval(function () {
      var exit = false;
      if (_this.state.count > 5) {
        exit = true;
      }

      _this.setState({
        count: _this.state.count + 1,
        exit: exit
      });
    }, 500);
    return _this;
  }

  _createClass(Log, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        count: 0
      };
    }
  }, {
    key: 'actionShouldExit',
    value: function actionShouldExit() {
      return this.state.exit;
    }
  }, {
    key: 'render',
    value: function render() {
      return 'Log action:.... ' + this.state.count;
    }
  }]);

  return Log;
})(_action2.default);

exports.default = Log;