var assert = require('chai').assert
var pyramid = require('../dist')
var state = require('../dist/state')

describe('Api', () => {
  describe('base', () => {
    var api = [
      'version',
      'directory',
      'delimiter',
      'color',
      'welcome',
      'goodby',
      'overflow',
      'autocomplete',
      'parse',
      'command',
      'log',
      'error',
      'warning',
      'success',
      'password',
      'checkbox',
      'list',
      'confirm',
      'input',
      'progressbar',
      'alert',
      'loadspinner',
      'help',
      'exit'
    ]

    api.forEach((method) => {
      it(method, () => {
        assert.isFunction(pyramid[method])})
    })
  })

  describe('command', () => {
    var command = pyramid.command('test')
    var api = [
      'required',
      'optional',
      'option',
      'subcommand',
      'log',
      'error',
      'warning',
      'success',
      'password',
      'checkbox',
      'list',
      'confirm',
      'input',
      'progressbar',
      'alert',
      'loadspinner',
      'ui',
      'action',
      'help',
      'exit'
    ]

    api.forEach((method) => {
      it(method, () => {
        assert.isFunction(command[method])})
    })
  })
})
