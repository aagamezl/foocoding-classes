import { MARKER, POINTER } from './constants.js'
import clearTerminal from './clearTerminal.js'

const displayList = ({ listOptions, message, selectedOption, selectedOptions = [], type = 'list' }) => {
  clearTerminal()

  console.log(`${message}\n`)

  listOptions.forEach((option, index) => {
    const prefix = index === selectedOption ? POINTER : ' '

    const formattedOption = [prefix]

    if (Object.keys(MARKER).includes(type)) {
      const isSelected = selectedOptions.includes(index)
      formattedOption.push(isSelected ? MARKER[type].filled : MARKER[type].empty)
    }

    formattedOption.push(option)
    // const glyph = isSelected ? MARKER[type].filled : MARKER[type].empty

    // const formattedOption = `${prefix} ${glyph} ${option}`

    // console.log(formattedOption)
    console.log(formattedOption.join(' '))
  })
}

export default displayList
