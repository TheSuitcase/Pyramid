let Debugger = {
  queue: [],

  log(...args){
    this.queue.push({
      method: 'log',
      args
    })
  },
  error(...args){
    this.queue.push({
      method: 'error',
      args
    })
  },
  warn(...args){
    this.queue.push({
      method: 'warn',
      args
    })
  }
}

export default Debugger;