var assert = require('chai').assert
var pyramid = require('../dist')
var state = require('../dist/state')

describe('command', () => {
  describe('command', () => {
    it('command should be set', () => {
      var command = pyramid.command('run')
      assert.equal(command.state.command, 'run')
    })
  })

  describe('required', () => {
    it('required should be set to name', () => {
      var command = pyramid
        .command('run')
        .required('name', 'description')

      assert.deepEqual(command.state.required, {name: 'description'})
    })

    it('required should have 2 field', () => {
      var command = pyramid
        .command('run')
        .required({
          name: 'description',
          test: 'desc'
        })

      assert.deepEqual(command.state.required, {
        name: 'description',
        test: 'desc'
      })
      assert.deepEqual(Object.keys(command.state.required), ['name', 'test'])
    })
  })
  describe('optional', () => {
    it('optional should be set to name', () => {
      var command = pyramid
        .command('run')
        .optional('name', 'description')

      assert.deepEqual(command.state.optional, {name: 'description'})
    })

    it('optional should have 2 field', () => {
      var command = pyramid
        .command('run')
        .optional({
          name: 'description',
          test: 'desc'
        })

      assert.deepEqual(command.state.optional, {
        name: 'description',
        test: 'desc'
      })
      assert.deepEqual(Object.keys(command.state.optional), ['name', 'test'])
    })
  })

  describe('option', () => {
    it('option should be set to name', () => {
      var command = pyramid
        .command('run')
        .option('-name', 'description')

      assert.deepEqual(command.state.options, {'-name': 'description'})
    })

    it('optional should have 2 field', () => {
      var command = pyramid
        .command('run')
        .option({
          '-name': 'description',
          '--test': 'desc'
        })

      assert.deepEqual(command.state.options, {
        '-name': 'description',
        '--test': 'desc'
      })
      assert.deepEqual(Object.keys(command.state.options), ['-name', '--test'])
    })
  })

  describe('subcommands', () => {
    it('subcommands should be set to name', () => {
      var subcommand = pyramid.command('new')

      var command = pyramid
        .command('run')
        .subcommand(subcommand)

      assert.deepEqual(command.state.subcommands, {'new': subcommand})
    })

    it('subcommands should be set to twice', () => {
      var subcommand1 = pyramid.command('new')
      var subcommand2 = pyramid.command('exit')

      var command = pyramid
        .command('run')
        .subcommand(subcommand1, subcommand2)

      assert.deepEqual(command.state.subcommands, {
        'new': subcommand1,
        'exit': subcommand2
      })
    })
    it('subcommands should be set to twice (Array input)', () => {
      var subcommand1 = pyramid.command('new')
      var subcommand2 = pyramid.command('exit')

      var command = pyramid
        .command('run')
        .subcommand([subcommand1, subcommand2])

      assert.deepEqual(command.state.subcommands, {
        'new': subcommand1,
        'exit': subcommand2
      })
    })
  })

  describe('ui', () => {
    it('ui should be registered as callback', () => {
      var command = pyramid
        .command('run')
        .ui(() => {
        })

      assert.isFunction(command.state.callbacks.ui)
    })
  })

  describe('action', () => {
    it('action should be registered as callback', () => {
      var command = pyramid
        .command('run')
        .action(() => {
        })

      assert.isFunction(command.state.callbacks.action)
    })
  })
})
