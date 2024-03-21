import { Type } from '@sinclair/typebox'

export const TodoID = Type.Object({
  id: Type.String({ format: 'uuid' })
})

export const TodoCreate = Type.Object({
  title: Type.String({ maxLength: 128 }),
  description: Type.String({ maxLength: 512 }),
  completed: Type.Optional(Type.Boolean({ default: false }))
}, { additionalProperties: false })

export const TodoUpdate = Type.Partial(TodoCreate)
