import { z } from '../index.js'

export function defaultBadResponseSchema(schema) {
  return z.object({
    status: z.string().openapi({ example: 'error | ValidationError' }),
    message: schema
  })
}

export function defaultOkResponseSchema(schema) {
  return z.object({
    status: z.string().openapi({ example: 'success' }),
    data: schema
  })
}
