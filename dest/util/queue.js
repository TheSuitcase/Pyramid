'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _thesuitcaseUid = require('thesuitcase-uid');

var _thesuitcaseUid2 = _interopRequireDefault(_thesuitcaseUid);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = (function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.queue = [];
    this.isActive = false;
  }

  _createClass(Queue, [{
    key: 'get',
    value: function get() {
      return this.queue;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.queue = [];
    }
  }, {
    key: 'merge',
    value: function merge(queue) {
      this.queue = this.queue.concat(queue.queue);
      return this;
    }
  }, {
    key: 'addWithScope',
    value: function addWithScope(scope) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.add.apply(this, args);
      return scope;
    }

    // Add to the end of the queue.

  }, {
    key: 'add',
    value: function add(action) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var length = args.length;
      // let cb = args[length - 1]
      // if (!Util.isFunction(cb)) {
      //   cb = undefined
      // }

      if (this.isActive) {
        // Add to the beginning of the queue.
        return this.queue.unshift({ action: action, args: args });
      }
      return this.queue.push({ action: action, args: args });
    }
  }]);

  return Queue;
})();

exports.default = Queue;