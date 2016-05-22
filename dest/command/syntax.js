'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Syntax = (function () {
  function Syntax(command) {
    _classCallCheck(this, Syntax);

    this.command = command;
    this.syntax = undefined;
  }

  _createClass(Syntax, [{
    key: 'get',
    value: function get() {
      return this.syntax;
    }
  }, {
    key: 'generate',
    value: function generate() {
      var command = this.command;
      var syntax = [command.name];

      syntax = syntax.concat(this.collectParameter(command.state.parameters.required, '<', '>'));
      syntax = syntax.concat(this.collectParameter(command.state.parameters.optional, '[', ']'));
      syntax = syntax.concat(this.collectParameter(command.state.parameters.options));

      this.syntax = syntax.join(' ');
    }
  }, {
    key: 'collectParameter',
    value: function collectParameter(parameters, before, after) {
      var keys = Object.keys(parameters);
      return keys.map(function (key) {
        return [before || '', key, after || ''].join('');
      });
    }
  }]);

  return Syntax;
})();

exports.default = Syntax;