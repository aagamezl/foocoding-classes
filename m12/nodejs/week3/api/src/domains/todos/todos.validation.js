import { REQUEST_SEGMENTS } from '../../utils/index.js'
import { TodoCreate, TodoID, TodoUpdate } from './todos.schema.js'

export const validations = {
  // POST /todos
  create: {
    [REQUEST_SEGMENTS.BODY]: TodoCreate
  },
  // DELETE /todos/:id
  delete: {
    [REQUEST_SEGMENTS.PARAMS]: TodoID
  },
  // GET /todos/:id
  getById: {
    [REQUEST_SEGMENTS.PARAMS]: TodoID
  },
  // PATCH /todos/:id
  update: {
    [REQUEST_SEGMENTS.PARAMS]: TodoID,
    [REQUEST_SEGMENTS.BODY]: TodoUpdate
  }
}
