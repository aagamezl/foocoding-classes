import { readFile, writeFile } from 'node:fs/promises'
// import { join } from 'node:path'

import { v4 as uuidv4 } from 'uuid';

import client from '../../db.js'

// const DATABASE_PATH = join(process.cwd(), process.env.DATABASE, 'todos.json')

// const readTodos = async (path) => {
const readTodos = async () => {
  // return JSON.parse(await readFile(path))
  // return sql`SELECT * FROM todos`
  return (await client.query('SELECT * FROM todos')).rows
}

const create = async (payload) => {
  // const todos = await readTodos(DATABASE_PATH)

  // payload.id = uuidv4()

  // todos.push(payload)

  // await writeFile(DATABASE_PATH, JSON.stringify(todos, null, 2))

  // return payload

  return (await client.query(`INSERT INTO todos (title, description, completed) VALUES('${payload.title}', '${payload.description}', ${payload.completed}) RETURNING *;`)).rows[0]
}

const deleteById = async (id) => {
  /** @type {Array} */
  const todos = await readTodos(DATABASE_PATH)

  const index = todos.findIndex(todo => todo.id === id)

  if (index === -1) {
    return false
  }

  todos.splice(index, 1)

  await writeFile(DATABASE_PATH, JSON.stringify(todos, null, 2))

  return true
}

const getAll = async () => {
  // return readTodos(DATABASE_PATH)
  return readTodos()
}

const getById = async (id) => {
  return (await readTodos(DATABASE_PATH)).find(todo => todo.id === id)
}

const update = async (id, payload) => {
  const todos = await readTodos(DATABASE_PATH)

  const index = todos.findIndex(todo => todo.id === id)

  if (index === -1) {
    return
  }

  todos[index] = { ...todos[index], ...payload }

  await writeFile(DATABASE_PATH, JSON.stringify(todos, null, 2))

  return todos[index]
}

const model = {
  create,
  deleteById,
  getAll,
  getById,
  update
}

export default model
