'use strict'
let pyramid = require('../dist')
let state = require('../dist/state')

pyramid
  .version('0.0.1')
  .delimiter('[Pyramid]')
  .color({
    default: 'yellow',
    success: 'green',
    error: 'red',
    warning: 'cyan'
  })
  .welcome('Welcome to Pyramid exaples!')
  .goodby('Check out the documentation at: https://github.com/thesuitcase/pyramid')

pyramid
  .command('run', 'Try out the password UI!')
  .password()
  // .linebreak()
  .log('Welcome to the run command!.')

  .action((type, answer, cb) => {
    // console.log(type, answer)
    if (type === 'password') {
      pyramid.log('Thank you for your password')
    }
    cb()
  })

pyramid
  .command('hello', 'Try out the hello UI!')
  .log('Hello there!')

pyramid
  .parse()
  .on('exit', () => {
    // console.log('Pyramid did exit!')
  })

  // pyramid.addAction('exit', (api) => {
  //    api:
  //     {
  //       command: [Command],
  //       pyramid: [Pyramid],
  //       arguments: [Array]
  //       cb: [Function]
  //     }

  // })
