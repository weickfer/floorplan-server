import { z } from '../index.js'

export const disciplineSchema = z.object({
  id: z.string().uuid(),
  name: z.string().openapi({ example: 'Engenharia' }),
  slug: z.string().openapi({ example: 'ENG' })
}).openapi('Discipline')

export const addDefaultDisciplinesSchema = z.object({
  disciplinesIDs: z.array(z.string().uuid())
})

export const addCustomDisciplinesSchema = z.object({
  name: z.string(),
  slug: z.string(),
})