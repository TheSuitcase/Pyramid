/*
  Disclaimer
  This file is heavily inspired by Inquirer.js
  
  Source: Inquirer.js
  File: screen-manager.js
  Url: https://github.com/SBoudrias/Inquirer.js/blob/66471210718ce92928ab5a6cc9a58fb70fc5d9d9/lib/utils/screen-manager.js
 */
'use strict'
import _ from 'lodash'
import util from './screen'
import cliWidth from 'cli-width'
import stripAnsi from 'strip-ansi'
import stringWidth from 'string-width'
import Readline from './readline'

class ScreenManager {
  constructor () {
    // These variables are keeping information to allow correct prompt re-rendering
    this.height = 0
    this.extraLinesUnderPrompt = 0
  }
  render (content, bottomContent) {
    Readline.output.unmute()
    this.clean(this.extraLinesUnderPrompt)

    /**
     * Write message to screen and setPrompt to control backspace
     */
    var promptLine = this.getLastLine(content)
    var rawPromptLine = stripAnsi(promptLine)

    // Remove the rl.line from our prompt. We can't rely on the content of
    // rl.line (mainly because of the password prompt), so just rely on it's
    // length.
    var prompt = promptLine
    if (Readline.line.length) {
      prompt = prompt.slice(0, -Readline.line.length)
    }
    Readline.setPrompt(prompt)

    // setPrompt will change cursor position, now we can get correct value
    var cursorPos = Readline._getCursorPos()
    var width = this.normalizedCliWidth()

    content = this.forceLineReturn(content, width)
    if (bottomContent) {
      bottomContent = this.forceLineReturn(bottomContent, width)
    }
    // Manually insert an extra line if we're at the end of the line.
    // This prevent the cursor from appearing at the beginning of the
    // current line.
    if (rawPromptLine.length % width === 0) {
      content += '\n'
    }
    var fullContent = content + (bottomContent ? '\n' + bottomContent : '')
    Readline.output.write(fullContent)

    /**
     * Re-adjust the cursor at the correct position.
     */

    // We need to consider parts of the prompt under the cursor as part of the bottom
    // content in order to correctly cleanup and re-render.
    var promptLineUpDiff = Math.floor(rawPromptLine.length / width) - cursorPos.rows
    var bottomContentHeight = promptLineUpDiff + (bottomContent ? this.getHeight(bottomContent) : 0)
    if (bottomContentHeight > 0) {
      util.up(bottomContentHeight)
    }

    // Reset cursor at the beginning of the line
    util.left(stringWidth(this.getLastLine(fullContent)))

    // Adjust cursor on the right
    util.right(cursorPos.cols)

    /**
     * Set up state for next re-rendering
     */
    this.extraLinesUnderPrompt = bottomContentHeight
    this.height = this.getHeight(fullContent)

    Readline.output.mute()
  }
  clean (extraLines) {
    if (extraLines > 0) {
      util.down(extraLines)
    }
    util.clearLine(this.height)
  }
  done () {
    Readline.setPrompt('')
    Readline.output.unmute()
    Readline.output.write('\n')
  }
  normalizedCliWidth () {
    var width = cliWidth({
      defaultWidth: 80,
      output: Readline.output
    })
    if (process.platform === 'win32') {
      return width - 1
    }
    return width
  }
  getHeight (content) {
    return content.split('\n').length
  }
  getLastLine (content) {
    return _.last(content.split('\n'))
  }
  breakLines (lines, width) {
    // Break lines who're longuer than the cli width so we can normalize the natural line
    // returns behavior accross terminals.
    var regex = new RegExp(
      '(?:(?:\\033[[0-9;]*m)*.?){1,' + width + '}',
      'g'
    )
    return lines.map(function (line) {
      var chunk = line.match(regex)
      // last match is always empty
      chunk.pop()
      return chunk || ''
    })
  }
  forceLineReturn (content, width) {
    return _.flatten(this.breakLines(content.split('\n'), width)).join('\n')
  }
}

export default ScreenManager
