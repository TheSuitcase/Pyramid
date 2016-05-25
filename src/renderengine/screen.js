/*
  Disclaimer
  This file is heavily inspired by Inquirer.js

  Source: Inquirer.js
  File: readline.js
  Url: https://github.com/SBoudrias/Inquirer.js/blob/66471210718ce92928ab5a6cc9a58fb70fc5d9d9/lib/utils/readline.js
 */
import AnsiEscapes from 'ansi-escapes'
import Readline from './readline'
import RenderEngine from './index'

let Screen = {
  /**
   * Move cursor left by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go left (default to 1)
   */
  left(x) {
    Readline.output.write(AnsiEscapes.cursorBackward(x))
  },

  /**
   * Move cursor right by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go left (default to 1)
   */
  right(x) {
    Readline.output.write(AnsiEscapes.cursorForward(x))
  },

  /**
   * Move cursor up by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go up (default to 1)
   */

  up(x) {
    Readline.output.write(AnsiEscapes.cursorUp(x))
  },

  /**
   * Move cursor down by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go down (default to 1)
   */

  down(x) {
    Readline.output.write(AnsiEscapes.cursorDown(x))
  },

  /**
   * Clear current line
   * @param  {Readline} rl  - Readline instance
   * @param  {Number}   len - number of line to delete
   */
  clearLine(len) {
    Readline.output.write(AnsiEscapes.eraseLines(len))
  },

  start() {
    Readline.input.setRawMode(true)
    Readline.input.resume()
  },

  exit(extraline = false) {
    // Note: Readline.output does not work
    // therefore we use process.stdout
    if (RenderEngine.lastRenderWasWithScreenManager) {
      process.stdout.write('\n')
    }
    process.exit()
  }
}

Screen.start()

export default Screen
