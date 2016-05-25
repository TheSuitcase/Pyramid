'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _state = require('./util/state');

var _state2 = _interopRequireDefault(_state);

var _queue = require('./util/queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _state2.default({
  responses: [],
  callbacks: {
    action: undefined,
    exit: undefined,
    validate: undefined
  },

  actions: new _queue2.default(),
  errors: [],

  command: undefined,
  commands: {},

  // User settings
  help: true,
  autocomplete: false,
  version: '0.0.0',

  delimiters: {
    default: '',
    error: undefined,
    success: undefined,
    warning: undefined
  },
  colors: {
    text: _colors2.default.white,
    error: _colors2.default.red,
    success: _colors2.default.green,
    warning: _colors2.default.yellow,
    blur: _colors2.default.gray,
    hightlight: _colors2.default.yellow
  }
});