import clc from 'cli-color'
import Chalk from 'chalk'

// See https://github.com/medikoo/cli-color
// for more colors.

let Colors = {
  red: clc.xterm(9),
  yellow: Chalk.yellow, // clc.xterm(228),
  orange: clc.xterm(214),
  blue: clc.xterm(75),
  purple: clc.xterm(177),
  green: clc.xterm(79),
  cyan: clc.xterm(80),
  gray: Chalk.gray,
  blur: clc.xterm(59)
}

export default Colors
