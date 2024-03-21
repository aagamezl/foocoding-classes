import { clearScreenDown, cursorTo } from 'node:readline'

/**
 * Function to clear the terminal
 *
 */
const clearTerminal = () => {
  process.stderr.write('\x1B[?25l') // Hide terminal cursor

  cursorTo(process.stdout, 0, 0)
  clearScreenDown(process.stdout)
}

export default clearTerminal
