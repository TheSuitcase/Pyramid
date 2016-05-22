'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arguments = (function () {
  function Arguments(command) {
    _classCallCheck(this, Arguments);

    this.command = command;

    this.required = {};
    this.optional = {};
    this.options = {};

    this.errors = [];
  }

  _createClass(Arguments, [{
    key: 'generate',
    value: function generate() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      this.collectRequiredArguments(args);
      this.collectOptionalArguments(args);
      this.collectionOptions(args);
      console.log(this);
      return this;
    }
  }, {
    key: 'collectRequiredArguments',
    value: function collectRequiredArguments(args) {
      // Clear out the old.
      this.required = {};

      var params = this.command.state.parameters.required;
      var keys = Object.keys(params);
      var len = keys.length;

      if (len === 0) {
        return;
      }

      if (len > args.length) {
        this.errors.push('Please enter all the required arguments!');
        return;
      }

      var arg = undefined;
      for (var i = 0; i < len; i++) {
        arg = params[keys[i]];
        this.required[arg.name] = args.splice(0, 1)[0];
      }
    }
  }, {
    key: 'collectOptionalArguments',
    value: function collectOptionalArguments(args) {
      this.optional = {};

      var params = this.command.state.parameters.optional;
      var keys = Object.keys(params);
      var len = keys.length;

      if (len === 0) {
        return;
      }

      var arg = undefined;
      for (var i = 0; i < len; i++) {
        arg = params[keys[i]];

        // Stop a soon as we find an option.
        if (args[0] && args[0].indexOf('-') > -1) {
          return;
        }

        this.optional[arg.name] = args.splice(0, 1)[0];
      }
    }
  }, {
    key: 'collectionOptions',
    value: function collectionOptions(args) {
      var _this = this;

      this.options = {};

      var params = this.command.state.parameters.options;
      var keys = Object.keys(params);

      if (keys.length === 0) {
        return;
      }

      var option = undefined;
      var pos = undefined;

      keys.forEach(function (key) {
        option = params[key];
        pos = args.indexOf(option.name);

        if (pos > -1) {
          if (!option.value) {
            _this.options[option.name] = true;
            return;
          }

          if (args[pos + 1] && args[pos + 1].indexOf('-') === -1) {
            _this.options[option.name] = args[pos + 1];
            return;
          }

          _this.errors.push('The option ' + option.name + ' is missing a value!');
        }
      });
    }
  }]);

  return Arguments;
})();

exports.default = Arguments;