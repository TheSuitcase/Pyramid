'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Delimiter = {
  get: function get() {
    return _state2.default.colors.default(_state2.default.delimiter.default) + ' ';
  }
};

exports.default = Delimiter;