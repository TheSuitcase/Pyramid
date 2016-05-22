'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = (function () {
  function State(state) {
    _classCallCheck(this, State);

    this.set(state);
  }
  /*
    Support:
      level 1 - every type
      level 2 - string, object, boolean
     Note: arrays will be replaced instead of merged!
          object will be merged instead of replaced!
   */

  _createClass(State, [{
    key: 'set',
    value: function set(data) {
      if (!_util2.default.isObject(data)) {
        return;
      }

      var keys = Object.keys(data);

      var i = 0,
          len = keys.length;
      var item = undefined;

      for (i; i < len; i++) {
        item = data[keys[i]];

        if (_util2.default.isObject(item)) {
          if (!this[keys[i]]) {
            this[keys[i]] = {};
          }

          Object.assign(this[keys[i]], item);
        } else {
          this[keys[i]] = item;
        }
      }

      return this;
    }
  }]);

  return State;
})();

exports.default = State;