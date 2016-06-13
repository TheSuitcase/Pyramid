'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Help = (function () {
  function Help(command) {
    _classCallCheck(this, Help);

    this.command = command;
    this.help = [];
  }

  _createClass(Help, [{
    key: 'get',
    value: function get() {
      return this.help;
    }
  }, {
    key: 'generate',
    value: function generate() {
      var help = [];

      // Syntax
      help.push([_colors2.default.yellow('syntax  '), '    ', this.command.state.syntax.get()].join(' '));
      help.push(_colors2.default.blur('----------------------------'));

      // Required
      help = help.concat(this.collectParameter(this.command.state.parameters.required, 'required', _colors2.default.red));

      help = help.concat(this.collectParameter(this.command.state.parameters.optional, 'optional', _colors2.default.green));

      if (Object.keys(this.command.state.parameters.options).length > 0) {
        help.push(_colors2.default.blur('----------------------------'));

        help = help.concat(this.collectParameter(this.command.state.parameters.options, 'option  ', _colors2.default.blue));
      }

      if (this.command.state.example) {
        help.push(_colors2.default.blur('----------------------------'));
        help.push([_colors2.default.purple('example '), '    ', this.command.state.example].join(' '));
      }

      if (this.command.state.docs) {
        help.push(_colors2.default.blur('----------------------------'));
        help.push([_colors2.default.cyan('docs    '), '    ', this.command.state.docs].join(' '));
      }

      this.help = help;
    }
  }, {
    key: 'collectParameter',
    value: function collectParameter() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var tag = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
      var color = arguments.length <= 2 || arguments[2] === undefined ? Color.white : arguments[2];

      var keys = Object.keys(params);
      return keys.map(function (key) {
        return [color(tag), '    ', params[key].name, params[key].description ? _colors2.default.blur('- ' + params[key].description) : ''].join(' ');
      });
    }
  }]);

  return Help;
})();

exports.default = Help;