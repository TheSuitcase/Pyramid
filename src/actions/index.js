import Fs from 'fs'

let Actions = {
  actions: {},
  collectFromDirectory() {
    let files = Fs.readdirSync(__dirname)

    files.forEach((file) => {
      if (file === 'index.js') { return; }
      let content = require('./' + file) || {}

      if (content && content.default) {
        content = content.default
      }

      Object.assign(this.actions, content)
    })
  }
}

Actions.collectFromDirectory()

export default Actions
