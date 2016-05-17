'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  password: function password(_ref) {
    var command = _ref.command;
    var pyramid = _ref.pyramid;
    var args = _ref.args;
    var cb = _ref.cb;

    _inquirer2.default.prompt([{
      type: 'password',
      name: 'password',
      message: args[0] || 'Enter your password:'
    }]).then(function (answer) {
      cb(answer.password);
    });
  },
  list: function list(_ref2) {
    var command = _ref2.command;
    var pyramid = _ref2.pyramid;
    var args = _ref2.args;
    var cb = _ref2.cb;

    var choices = args[1] || [];

    choices = choices.map(function (choice) {
      return { name: choice };
    });

    _inquirer2.default.prompt([{
      type: 'list',
      name: 'list',
      message: args[0] || '',
      choices: choices
    }]).then(function (answer) {
      cb(answer.list);
    });
  },
  checkbox: function checkbox(_ref3) {
    var command = _ref3.command;
    var pyramid = _ref3.pyramid;
    var args = _ref3.args;
    var cb = _ref3.cb;

    var choices = args[1] || [];

    choices = choices.map(function (choice) {
      return { name: choice };
    });

    _inquirer2.default.prompt([{
      type: 'checkbox',
      name: 'checkbox',
      message: args[0] || '',
      choices: choices
    }]).then(function (answer) {
      cb(answer.checkbox);
    });
  },
  confirm: function confirm(_ref4) {
    var command = _ref4.command;
    var pyramid = _ref4.pyramid;
    var args = _ref4.args;
    var cb = _ref4.cb;

    _inquirer2.default.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: args[0] || 'Are you sure?'
    }]).then(function (answer) {
      cb(answer.confirm);
    });
  },
  input: function input(_ref5) {
    var command = _ref5.command;
    var pyramid = _ref5.pyramid;
    var args = _ref5.args;
    var cb = _ref5.cb;

    _inquirer2.default.prompt([{
      type: 'input',
      name: 'input',
      message: args[0] || ''
    }]).then(function (answer) {
      cb(answer.input);
    });
  }
};