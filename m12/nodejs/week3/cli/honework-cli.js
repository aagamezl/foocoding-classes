import { question } from './src/index.js'

const API_URL = 'http:/localhost:3000/todos'

/**
 *
 * @param {string[]} options
 * @returns {Object<string, string>}
 */
const askQuestions = async (options) => {
  const answers = {}

  for (const option of options) {
    answers[[option.toLowerCase()]] = await question(`Provide ${option}: `)
  }

  return answers
}

const createTodo = (payload) => {
  return fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      accept: 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(response => response.json())
}

const displayUsage = () => {
  return `
  Usage:

  CREATE [arguments]  - Creates Todo
  DELETE [arguments]  - Deletes Todo (By UUID)
  END                 - Terminates the current operation (if applicable)
  GET                 - Retrieves information (By UUID)
  LIST                - Lists available Todos
  UPDATE [arguments]  - Updates a Todo (By UUID)
  HELP                - Displays this usage information
  `
}

let answer = ''

const COMMANDS = {
  CREATE: async () => {
    const options = [
      'Title',
      'Description',
      'Date'
    ]

    const payload = await askQuestions(options)

    console.log(JSON.stringify(payload, null, 2))
    const todo = await createTodo(payload)
  },
  DELETE: () => { },
  END: () => {
    process.exit(0)
  },
  GET: async () => {
    try {
      const todos = await fetch(API_URL)
        .then(response => response.json())

      console.table(todos)
    } catch (error) {

    }
  },
  HELP: () => {
    console.log(displayUsage())
  },
  LIST: () => { },
  UPDATE: async () => {
    const options = [
      'Id',
      'Title',
      'Description',
      'Date'
    ]

    const answers = await getAnswers(options)

    console.log(JSON.stringify(answers, null, 2))
  }
}

console.log(displayUsage())
do {

  answer = await question('> ')

  if (!COMMANDS[answer]) {
    console.log(`Command [${answer}] is not a valid Command`);

    continue
  }

  await COMMANDS[answer]()
} while (answer !== 'END')
