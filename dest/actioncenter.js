'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('./actions/log');

var _log2 = _interopRequireDefault(_log);

var _error = require('./actions/error');

var _error2 = _interopRequireDefault(_error);

var _input = require('./actions/input');

var _input2 = _interopRequireDefault(_input);

var _confirm = require('./actions/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionCenter = {
  actions: {
    log: _log2.default, error: _error2.default, input: _input2.default, confirm: _confirm2.default
  },

  add: function add(name, fn) {
    this.actions[name] = fn;
  },
  remove: function remove(name) {
    if (!this.actions[name]) {
      return;
    }
    delete this.actions[name];
  },
  merge: function merge(scope, queue) {
    var keys = Object.keys(this.actions);
    var i = 0,
        len = keys.length,
        key = undefined;

    for (i; i < len; i++) {
      key = keys[i];
      scope[key] = this.addActionToQueue.bind(this, this.actions[key], queue, scope);
    }
  },
  addActionToQueue: function addActionToQueue(action, queue, scope) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    queue.push({ action: action, args: args });
    return scope;
  }
};

exports.default = ActionCenter;