export default {
  exit({command, pyramid, args, cb}) {
    if (command) {
      command.emit('exit')
    }
    pyramid.emit('exit')
    process.exit()
    cb()
  }
}
