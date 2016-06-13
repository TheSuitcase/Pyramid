var pyramid = require('../dest')
var action = require('./action')

pyramid
  .version('0.0.1')
  .delimiter('[Suitcase]')
  .color('yellow')

pyramid
// .addAction('test', action)
// .addAction({
//   log: action,
//   test: action
// })

// .removeAction('checkbox')
// .removeAction('checkbox', 'test', 'log')

// pyramid
// .loadFromDirectory(__dirname)

var c = pyramid
  .command('run')
  // .docs('http://github.com/thesuitcase/pyramid')
  // .example('run myinstance hello')
  .required('instance', 'description 1')
  .required('instance', {
    description: 'description 2',
    validate(input) {
      return true
    }
  })
  .optional('task', {
    description: 'description 2',
    validate(input) {
      // console.log('VALIDATE REQUIRED ARGUMENT: ', input)
      // return 'Hello you are invalid!'
      return true
    }
  })

  // .required({
  //   instance: {
  //     description: 'test'
  //   },
  //   os: {
  //     description: 'desc'
  //   }
  // })

  // .option('-n --N -new', 'description')

  .option('-n --N -new', {
    value: true,
    validate(input) {
      // console.log(input)
      return true
    }
  })

  // .option({
  //   '-n --N -new': {
  //     description: 'test'
  //   }
  // })

  // .log('Hello there!')
  .confirm('Would you like some help?')
  // .checkbox('item 1', 'item 2', 'item 3')
  // .wait(2)
  // .help()

  // return undefined will be ignored
  .validate((required, optional, options) => {
    // console.log('validate global command', required, optional, options)
    return true // ['hello tehre!', 'bye']
  })

  .action((required, optional, options, answers) => {
    if (answers[0] && answers[0].response[0]) {
      pyramid.help()
    }

    // console.log('action', required, optional, options, answers)
    return true
  })
  // .exit(() => {
  //   console.log('Exit!')
  // })

pyramid
  .command('rain')

pyramid
  .command('ruine')

pyramid
  .command('rest')

pyramid
  .exit(() => {
  })
  // .overflow(function () {
  //   // return ['You are wrong!', 'bye']
  // })
  .parse()
  // .exit(() => {
  //   console.log('Bye!')
  // })
