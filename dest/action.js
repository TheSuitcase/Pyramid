'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _runtime = require('./runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = (function () {
  function Action() {
    _classCallCheck(this, Action);

    this.state = {};
    this.colors = _colors2.default;
    this.response = undefined;

    if (this.getInitialState) {
      this.state = this.getInitialState();
    }
  }

  _createClass(Action, [{
    key: 'setResponse',
    value: function setResponse(response) {
      this.response = response;
    }
  }, {
    key: 'setState',
    value: function setState(data) {
      Object.assign(this.state, data);

      if (_runtime2.default.renderEngine) {
        _runtime2.default.renderEngine.render();
      }
    }
  }]);

  return Action;
})();

exports.default = Action;