var pyramid = require('../dest')

pyramid
  .command('autocomplete')

  .optional('test', {
    autocomplete: ['item 1', 'item 2', 'item 3']
  })

  .autocomplete()
  .log('hi')

pyramid
  .parse()
