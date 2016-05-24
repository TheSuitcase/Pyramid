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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {
  actions: {
    log: _log2.default,
    wait: _wait2.default
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
  },
  execute: function execute(command) {
    // Merge command an state queue.
    if (command) {
      _state2.default.actions.merge(command.state.actions);
    }
    // console.log(State.actions)
    _renderengine2.default.start();
  }
};

exports.default = Actions;