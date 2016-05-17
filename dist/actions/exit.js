'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  exit: function exit(_ref) {
    var command = _ref.command;
    var pyramid = _ref.pyramid;
    var args = _ref.args;
    var cb = _ref.cb;

    if (command) {
      command.emit('exit');
    }
    pyramid.emit('exit');
    process.exit();
    cb();
  }
};