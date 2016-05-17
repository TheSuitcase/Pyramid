'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {
  actions: {},
  collectFromDirectory: function collectFromDirectory() {
    var _this = this;

    var files = _fs2.default.readdirSync(__dirname);

    files.forEach(function (file) {
      if (file === 'index.js') {
        return;
      }
      var content = require('./' + file) || {};

      if (content && content.default) {
        content = content.default;
      }

      Object.assign(_this.actions, content);
    });
  }
};

Actions.collectFromDirectory();

exports.default = Actions;