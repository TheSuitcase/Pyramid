###In Development: This package is not usable at the moment.
---

# Pyramid
The user friendly commandline tool

## Install
> NOTE: We are working on getting the `pyramid` namespace on npm.

`npm i thesuitcase-pyramid`

## Future Usage
```js
// Ecmascript 6 and higher
import pyramid from 'pyramid';

// Ecmascript 5 and lower
var pyramid = require('pyramid');

// General.
pyramid

  // Set a version
  // default: 'undefined'
  .version('0.0.1')

  // Load the command files from this directory.
  .directory(__dirname + '/commands')

  // Set a custom delimiter
  .delimiter('pyramid$', 'black') // default delimiter
  .delimiter({default: {
  	color: 'black',
  	delimiter: 'pyramid$'
  }, error: ..., warning: ..., success: ...})

  // Pick a color as the base color. (chalk values)
  .color('yellow')

  // Show this welcome message when the cli starts.
  .welcome()

  // Show this goodby message when the cli closes.
  .goodby()

  // Catch all the requestes that didn't make the cut.
  .overflow()
  
  // Set autocomplete
  // default: true
  .autocomplete(false)

  // The last command, we will start pyramid for you. 
  // default: process.argv
  .parse()
  
  // Command
pyramid
	
	// Create the command 'run'
	.command('run')
	
	// Set required arguments.
	.required('requiredArg', 'A description')
	// Order is important!
	.required({
		'requiredArg1':'a description',
		'requiredArg2':'a description',
	})
	
	// Set optional arguments
	.optional('optionalArg', 'A description')
	// Order is important!
	.optional({
		'optionalArg1': 'a description',
		'optionalArg2': 'a description',
	})
	
	// Set options
	.option('-option', 'A description')
	.option({
		'-option1': 'a description',
		'--option2': 'a description',
	})
	
	// Set subcommands
	.subcommand('[pyramid.command]')
	
	// UI.
	.password('message')
	.checkbox('message', ['choice 1', 'choice 2'])
	.list('message', ['choice 1', 'choice 2'])
	.confirm('message')
	.input('message')
	.progressbar('message', 30)
	.alert('message')
	.loadspinner('message')
	
	// UI response
	.action((type, ui, answer) => {
		// Handle the output of an ui element.
		// Or prompt a new ui element.
		if(answer === false){
			pyramid.password('Please enter your password')
		}
	})
	
	// UI messages
	.log()
	.error()
	.warn()
	.success()
	
	// Show the help summary
	.help()
	
	// Exit the command line.
	.exit()
```

