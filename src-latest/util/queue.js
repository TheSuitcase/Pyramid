class Queue {
  constructor () {
    this.queue = []
    this.isActive = false
  }

  get () {
    return this.queue
  }

  clear () {
    this.queue = []
  }

  merge (queue) {
    this.queue = this.queue.concat(queue.queue)
    return this
  }

  addWithScope (scope, ...args) {
    this.add.apply(this, args)
    return scope
  }

  // Add to the end of the queue.
  add (action, ...args) {
    if (this.isActive) {
      // Add to the beginning of the queue.
      return this.queue.unshift({action, args})
    }
    return this.queue.push({action, args})
  }

}

export default Queue
