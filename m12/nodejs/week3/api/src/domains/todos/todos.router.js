import express from 'express'

import { validate } from '../../middlewares/index.js'

import controller from './todos.controller.js'
import { validations } from './todos.validation.js'

const router = express.Router({ strict: true })

router.post('/todos', validate(validations.create), controller.create)

router.get('/todos', controller.getAll)

router.get('/todos/:id', validate(validations.getById), controller.getById)

router.delete('/todos/:id', validate(validations.delete), controller.deleteById)

router.patch('/todos/:id', validate(validations.update), controller.update)

export default router
