import { z } from '../index.js'

export const createGroupSchema = z.object({
  name: z.string().openapi({ example: 'Grupo #1' }),
  members: z.array(z.string()).openapi({ example: ['1234', '2345', '1456'] })
}).openapi('CreateGroup')

export const groupSchema = createGroupSchema.extend({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  ownerId: z.string().uuid(),
}).openapi('Group')

export const deleteGroupSchema = z.object({
  id: z.string().uuid().openapi({
    description: 'O ID único do grupo'
  }),
}).openapi('DeleteGroupParams')

