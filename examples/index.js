var pyramid = require('../dest')

pyramid
  .version('0.0.1')

var c = pyramid
  .command('run')
  .docs('http://github.com/thesuitcase/pyramid')
  .example('run myinstance hello')
  .required('instance', 'description 1')

  .optional('instance', {
    description: 'description 2',
    validate: false
  })

  .required({
    instance: {
      description: 'test'
    },
    os: {
      description: 'desc'
    }
  })

  .option('-n --N -new', 'description')

  .option('-n --N -new', {
    value: true,
    validate() {
      return true
    }
  })

  .option({
    '-n --N -new': {
      description: 'test'
    }
  })

  .log('Hello there!')
  .confirm()
  // .wait(1)

pyramid
  .command('rain')

pyramid
  .command('ruine')

pyramid
  .command('rest')

pyramid
  .parse()
