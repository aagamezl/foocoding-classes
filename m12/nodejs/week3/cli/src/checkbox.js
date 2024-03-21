// @ts-check

import { createInterface } from 'node:readline'

import clearTerminal from './utils/clearTerminal.js'
import closeTerminal from './utils/closeTerminal.js'
import { KEYBOARD_KEYS } from './utils/constants.js'
import displayList from './utils/displayList.js'

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} Options
 * @property {string[]} listOptions - Indicates whether the Courage component is present.
 * @property {string} message - Indicates whether the Power component is present.
 * @property {'radio' | 'checkbox'} type - Indicates whether the Wisdom component is present.
 */

// const displayList = ({ listOptions, message, selectedOption, selectedOptions, type }) => {
//   clearTerminal()

//   console.log(`${message}\n`)

//   listOptions.forEach((option, index) => {
//     const isSelected = selectedOptions.includes(index)
//     const prefix = index === selectedOption ? POINTER : ' '
//     const checkbox = isSelected ? MARKER[type].filled : MARKER[type].empty // Filled circle vs. empty circle
//     const formattedOption = `${prefix} ${checkbox} ${option}`

//     console.log(formattedOption)
//   })
// }

/**
 *
 * @param {Options} listOptions
 * @returns {Promise.<number[]>}
 */
const checkbox = ({ listOptions, message }) => {
  return new Promise((resolve) => {
    // Create readline interface
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    })

    // Initial state
    let selectedOption = 0
    const selectedOptions = []

    // Store previous prompt
    const previousPrompt = rl.getPrompt()

    // Set the current prompt to an empty string
    rl.setPrompt('')

    displayList({ listOptions, message, selectedOption, selectedOptions, type: 'checkbox' })

    // Set up input event listeners
    process.stdin.on('keypress', (_, key) => {
      switch (key.name) {
        case KEYBOARD_KEYS.DOWN: {
          selectedOption = (selectedOption + 1) % listOptions.length

          displayList({ listOptions, message, selectedOption, selectedOptions, type: 'checkbox' })

          break
        }

        case KEYBOARD_KEYS.ESCAPE: {
          closeTerminal(rl, previousPrompt)

          break
        }

        case KEYBOARD_KEYS.SPACE: {
          const currentOption = selectedOption
          const isSelected = selectedOptions.includes(currentOption)

          if (isSelected) {
            const optionIndex = selectedOptions.indexOf(currentOption)
            selectedOptions.splice(optionIndex, 1)
          } else {
            selectedOptions.push(currentOption)
          }

          displayList({ listOptions, message, selectedOption, selectedOptions, type: 'checkbox' })

          break
        }

        case KEYBOARD_KEYS.UP: {
          selectedOption = (selectedOption - 1 + listOptions.length) % listOptions.length

          displayList({ listOptions, message, selectedOption, selectedOptions, type: 'checkbox' })

          break
        }

        default:
          break
      }
    })

    // Handle selection confirmation
    rl.on('line', () => {
      clearTerminal()

      closeTerminal(rl, previousPrompt)

      resolve(selectedOptions.sort())
    })

    // Capture CTRL + C
    rl.on('SIGINT', () => {
      closeTerminal(rl, previousPrompt)
    })

    rl.on('SIGTSTP', () => {
      closeTerminal(rl, previousPrompt)
    })

    // Start reading input
    rl.prompt()
  })
}

export default checkbox
