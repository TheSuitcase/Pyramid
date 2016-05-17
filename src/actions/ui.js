import Inquirer from 'inquirer'

export default {
  password({command, pyramid, args, cb}) {
    Inquirer.prompt([{
      type: 'password',
      name: 'password',
      message: args[0] || 'Enter your password:'
    }]).then((answer) => {
      cb(answer.password)
    })
  },
  list({command, pyramid, args, cb}) {
    let choices = args[1] || []

    choices = choices.map((choice) => {
      return {name: choice}
    })

    Inquirer.prompt([{
      type: 'list',
      name: 'list',
      message: args[0] || '',
      choices: choices
    }]).then((answer) => {
      cb(answer.list)
    })
  },

  checkbox({command, pyramid, args, cb}) {
    let choices = args[1] || []

    choices = choices.map((choice) => {
      return {name: choice}
    })

    Inquirer.prompt([{
      type: 'checkbox',
      name: 'checkbox',
      message: args[0] || '',
      choices: choices
    }]).then((answer) => {
      cb(answer.checkbox)
    })
  },

  confirm({command, pyramid, args, cb}) {
    Inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: args[0] || 'Are you sure?',
    }]).then((answer) => {
      cb(answer.confirm)
    })
  },

  input({command, pyramid, args, cb}) {
    Inquirer.prompt([{
      type: 'input',
      name: 'input',
      message: args[0] || '',
    }]).then((answer) => {
      cb(answer.input)
    })
  },

}
