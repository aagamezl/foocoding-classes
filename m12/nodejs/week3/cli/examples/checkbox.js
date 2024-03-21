import checkbox from '../src/checkbox.js'

// Define your list options
const listOptions = ['Barcelona', 'Munich', 'Paris']

const selectedOptions = await checkbox({
  listOptions,
  message: 'Select option(s) (press spacebar to toggle selection):'
})

const selectedOptionNames = selectedOptions.map(index => listOptions[index])

console.log(`Selected option(s): ${selectedOptionNames.join(', ')}`)
