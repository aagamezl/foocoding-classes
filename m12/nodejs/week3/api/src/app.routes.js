import { Router } from 'express'

import { todosRouter } from './domains/todos/index.js'

const router = Router()

router.use('/', todosRouter)

export default router
