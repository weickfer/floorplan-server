import { z } from '../index.js'

export const createProjectSchema = z.object({
  name: z.string().openapi({ example: 'Valec' }),
  externalProjectId: z.string().openapi({ example: 'PROJ-001' }),
}).openapi('CreateProject')

export const deleteProjectSchema = z.object({
  externalProjectId: z.string().openapi({
    description: 'O ID externo do projeto'
  }),
}).openapi('DeleteProjectParams')
