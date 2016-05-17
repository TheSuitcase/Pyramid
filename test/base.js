var assert = require('chai').assert
var pyramid = require('../dist')
var state = require('../dist/state')

describe('Base', () => {

  describe('version', () => {
    it('version should be set to 1.0.0', () => {
      pyramid.version('1.0.0')
      assert.equal(state.version, '1.0.0')
    })
  })

  describe('directory', () => {
    it('directory should have the length of 1', () => {
      pyramid.directory(__dirname + 'commands')
      assert.equal(state.directories.length, 1)
    })
    it('directory should have the length of 3', () => {
      pyramid.directory([__dirname + 'commands', __dirname + 'util'])
      assert.equal(state.directories.length, 3)
    })
  })

  describe('delimiter', () => {
    it('default should be set', () => {
      pyramid.delimiter('$')
      assert.equal(state.delimiter.default, '$')
      assert.equal(state.delimiter.success, undefined)
      assert.equal(state.delimiter.error, undefined)
      assert.equal(state.delimiter.warning, undefined)
    })

    it('success should be set only', () => {
      pyramid.delimiter({success: '$'})
      assert.equal(state.delimiter.default, '$')
      assert.equal(state.delimiter.success, '$')
      assert.equal(state.delimiter.error, undefined)
      assert.equal(state.delimiter.warning, undefined)
    })

    it('success should be set with color', () => {
      pyramid.delimiter({success: {color: 'green', delimiter: '$'}})
      assert.equal(state.delimiter.default, '$')
      assert.equal(state.delimiter.success, '$')
      assert.equal(state.color.success, 'green')
      assert.equal(state.delimiter.error, undefined)
      assert.equal(state.delimiter.warning, undefined)
    })
  })

  describe('color', () => {
    it('default should be green', () => {
      pyramid.color('green')
      assert.equal(state.color.default, 'green')
      assert.equal(state.color.success, 'green')
      assert.equal(state.color.error, undefined)
      assert.equal(state.color.warning, undefined)
    })
    it('error should be red', () => {
      pyramid.color({error: 'red'})
      assert.equal(state.color.default, 'green')
      assert.equal(state.color.success, 'green')
      assert.equal(state.color.error, 'red')
      assert.equal(state.color.warning, undefined)
    })
  })

  describe('welcome', () => {
    it('welcome should be set', () => {
      pyramid.welcome('Welcome')
      assert.equal(state.welcome, 'Welcome')
    })
  })

  describe('goodby', () => {
    it('goodby should be set', () => {
      pyramid.welcome('goodby')
      assert.equal(state.welcome, 'goodby')
    })
  })

  describe('autocomplete', () => {
    it('autocomplete should be set to true', () => {
      pyramid.autocomplete()
      assert.equal(state.autocomplete, true)
    })
    it('autocomplete should be set to false', () => {
      pyramid.autocomplete(false)
      assert.equal(state.autocomplete, false)
    })
  })

  describe('overflow', () => {
    it('overflow should be registered', () => {
      pyramid.overflow(() => {
      })
      assert.isFunction(state.callbacks.overflow)
    })
  })
})
