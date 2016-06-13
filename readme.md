***Note: This is still a work in progress and it is not ready for production.***

---

#Pyramid
**The userfriendly command line tool.**

## Our goal and why?
We as developers are working with the command line almost every day. So why not make a friendly and userfriendly place?

**User goals:**

* User friendly
* Easy to understand UI
* Fast
* Use the command line without need to look up the docs.

**Developer goals:**

* Developer friendly
* Clear and easy-to-use api
* Customizable
* Ready to use actions

## Install
> We are still working on that :)

## API
**Without actions:**

```js
import pyramid from 'pyramid'

// Create your own command line tool!
pyramid
	.version('0.0.1')
	.delimiter('myApp$')
	.color('yellow')

// Let's create your first command!
pyramid
	.command('order')	
	.required('type', 'Do you want pizza or a saled?')
	.optional('time' 'When do you want your food?')
	.option('-h', 'Deliver my food at my place!')
	.option('-p', 'I will pick up my food.')
	
	.action((required, optional, options, answers) => {
		// Process the answers of your users here.
	})
```

**With actions:**

```js
import pyramid from 'pyramid'

// Create your own command line tool!
pyramid
	.version('0.0.1')
	.delimiter('myApp$')
	.color('yellow')

// Let's create your first command!
pyramid
	.command('order')	
	.checkbox('What kind of food would you like?',[
		'Pizza', 'Salad'
	])
	.checkbox('When do you want your food?',[
		'When it is ready.', 'Now!'
	])
	.confirm('Should we deliver your food at your place?')
	
	.action((required, optional, options, answers) => {
		// Process the answers of your users here.
		/* Answers:
			[{position: 0, choice: 'Pizza'}, 
			 {position: 1, choice: 'Now!'}
			 true]
		*/
	})
```


## Wanna help?
We would love to work with you! Leave an issue or an pull request to get started!