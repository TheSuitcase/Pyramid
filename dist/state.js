'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
  queue: new _Queue2.default(),
  version: undefined,
  directories: [],
  commands: {},
  autocomplete: true,
  color: {
    default: undefined,
    error: undefined,
    warning: undefined,
    success: undefined
  },
  delimiter: {
    default: undefined,
    error: undefined,
    warning: undefined,
    success: undefined
  },
  welcome: undefined,
  goodby: undefined,
  callbacks: {
    overflow: undefined,
    ui: undefined,
    action: undefined
  },

  getDelimiter: function getDelimiter() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];

    var delimiter = this.delimiter[type] || this.delimiter.default;
    var color = this.color[type] || this.color.default;
    return _chalk2.default[color](delimiter);
  }
};

exports.default = state;

module.exports = state;