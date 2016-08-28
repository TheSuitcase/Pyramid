'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Debug = {
  queue: [],

  log: function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.queue.push({ method: 'log', args: args });
  },
  error: function error() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this.queue.push({ method: 'error', args: args });
  },
  warn: function warn() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    this.queue.push({ method: 'warn', args: args });
  }
};

exports.default = Debug;