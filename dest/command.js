'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _actioncenter = require('./actioncenter');

var _actioncenter2 = _interopRequireDefault(_actioncenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = (function () {
  function Command(name) {
    _classCallCheck(this, Command);

    this.name = name;

    this.state = {
      name: this.name,
      required: {},
      optional: {},
      options: {},

      description: undefined,
      docs: undefined,
      example: undefined,

      queue: []
    };

    _actioncenter2.default.merge(this, this.state.queue);

    return this;
  }

  _createClass(Command, [{
    key: 'required',
    value: function required(name, description) {
      if (!_underscore2.default.isString(name)) {
        _debug2.default.error('[command.' + this.name + '.required.' + name + '] The name must be a string!');
        return this;
      }
      if (!_underscore2.default.isString(description)) {
        _debug2.default.error('[command.' + this.name + '.required.' + name + '] The description must be a string!');
        return this;
      }

      this.state.required[name] = { description: description };
      return this;
    }
  }, {
    key: 'optional',
    value: function optional(name, description) {
      if (!_underscore2.default.isString(name)) {
        _debug2.default.error('[command.' + this.name + '.optional.' + name + '] The name must be a string!');
        return this;
      }
      if (!_underscore2.default.isString(description)) {
        _debug2.default.error('[command.' + this.name + '.optional.' + name + '] The description must be a string!');
        return this;
      }

      this.state.optional[name] = { description: description };
      return this;
    }
  }, {
    key: 'option',
    value: function option(name, description) {
      if (!_underscore2.default.isString(name)) {
        _debug2.default.error('[command.' + this.name + '.option.' + name + '] The name must be a string!');
        return this;
      }
      if (!_underscore2.default.isString(description)) {
        _debug2.default.error('[command.' + this.name + '.option.' + name + '] The description must be a string!');
        return this;
      }

      this.state.options[name] = { description: description };
      return this;
    }
  }, {
    key: 'description',
    value: function description(_description) {
      if (!_underscore2.default.isString(_description)) {
        _debug2.default.error('[command.' + this.name + '.description] The description must be a string!');
        return this;
      }
      this.state.description = _description;
      return this;
    }
  }, {
    key: 'docs',
    value: function docs(_docs) {
      if (!_underscore2.default.isString(_docs)) {
        _debug2.default.error('[command.' + this.name + '.docs] The docs must be a string!');
        return this;
      }
      this.state.docs = _docs;
      return this;
    }
  }, {
    key: 'example',
    value: function example(_example) {
      if (!_underscore2.default.isString(_example)) {
        _debug2.default.error('[command.' + this.name + '.example] The example must be a string!');
        return this;
      }
      this.state.example = _example;
      return this;
    }
  }]);

  return Command;
})();

exports.default = Command;