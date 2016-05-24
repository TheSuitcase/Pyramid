import Readline from 'readline'
import MuteStream from 'mute-stream'

/*
  Default streams.
 */
let streams = {
  input: process.stdin,
  output: process.stdout
}

/*
  Make the output stream mutable.
 */
var ms = new MuteStream()
ms.pipe(streams.output || process.stdout)
streams.output = ms

/*
  The rl instance/interface
 */
let rl = Readline.createInterface({
  terminal: true,
  input: streams.input,
  output: streams.output
})

console.log('[Readline] Setup')

export default rl
