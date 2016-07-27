'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _renderengine = require('../renderengine');

var _renderengine2 = _interopRequireDefault(_renderengine);

var _typeof = require('../util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

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

var _help = require('./defaults/help');

var _help2 = _interopRequireDefault(_help);

var _input = require('./defaults/input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Actions = {
  irremovable: [],
  actions: {
    log: _log2.default,
    error: _error2.default,
    wait: _wait2.default,
    confirm: _confirm2.default,
    checkbox: _checkbox2.default,
    help: _help2.default,
    input: _input2.default
  },
  collectIrremovableActions: function collectIrremovableActions() {
    this.irremovable = Object.keys(this.actions);
  },
  add: function add(actions, action) {
    var _this = this;

    if ((0, _typeof2.default)(actions, 'string')) {
      actions = _defineProperty({}, actions, action);
    }

    var keys = Object.keys(actions);

    keys.forEach(function (name) {
      if (_this.irremovable.indexOf(name) > -1) {
        return false;
      }
      _this.actions[name] = actions[name];
    });

    return true;
  },
  remove: function remove() {
    var _this2 = this;

    for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
      actions[_key] = arguments[_key];
    }

    actions.forEach(function (action) {
      if ((0, _typeof2.default)(action, 'array')) {
        Actions.remove(action);
        return;
      }
      if (!_this2.actions[action]) {
        return false;
      }
      if (_this2.irremovable.indexOf(action) > -1) {
        return false;
      }
      delete _this2.actions[action];
    });
    return true;
  },
  merge: function merge(scope, queue) {
    var _this3 = this;

    var keys = Object.keys(this.actions);

    keys.forEach(function (key) {
      if (scope[key]) {
        return;
      }

      scope[key] = queue.addWithScope.bind(queue, scope, _this3.actions[key]);
    });
  }
};

Actions.collectIrremovableActions();

exports.default = Actions;