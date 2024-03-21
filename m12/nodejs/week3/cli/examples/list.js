import list from '../src/list.js'

// Define your list options
const listOptions = ['Barcelona', 'Munich', 'Paris']

const answer = await list({
  listOptions,
  message: 'Select option(s) (press spacebar to toggle selection):'
})

console.log('Option index: %d, Option: %s', answer, listOptions[answer])
