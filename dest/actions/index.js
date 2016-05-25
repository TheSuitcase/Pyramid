'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _renderengine = require('../renderengine');

var _renderengine2 = _interopRequireDefault(_renderengine);

var _log = require('./defaults/log');

var _log2 = _interopRequireDefault(_log);

var _wait = require('./defaults/wait');

var _wait2 = _interopRequireDefault(_wait);

var _confirm = require('./defaults/confirm');

var _confirm2 = _interopRequireDefault(_confirm);

var _checkbox = require('./defaults/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _error = require('./defaults/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {
  actions: {
    log: _log2.default,
    error: _error2.default,
    wait: _wait2.default,
    confirm: _confirm2.default,
    checkbox: _checkbox2.default
  },
  add: function add(name, action) {
    this.actions[name] = action;
    return true;
  },
  remove: function remove(name) {
    if (!this.actions[name]) {
      return false;
    }
    delete this.actions[name];
    return true;
  },
  merge: function merge(scope, queue) {
    var _this = this;

    var keys = Object.keys(this.actions);

    keys.forEach(function (key) {
      if (scope[key]) {
        return;
      }

      scope[key] = queue.addWithScope.bind(queue, scope, _this.actions[key]);
    });
  }
};

exports.default = Actions;