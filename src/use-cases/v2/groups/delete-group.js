import { ConflictError, UnauthorizedError } from '../../../infra/errors/4xx.js'
import { deleteGroupSchema } from "../../../lib/zod/schemas/group.js"

export class DeleteGroupUseCase {
  constructor(
    groupsRepo
  ) {
    this.groupsRepo = groupsRepo
  }

  async execute({ id, userId }) {
    await deleteGroupSchema.parseAsync({ id })

    const group = await this.groupsRepo.findById(id)

    if(group.ownerId !== userId) {
      throw new UnauthorizedError('Somente o dono do grupo pode deletá-lo')
    }

    if(group?.annotationsCount > 0) {
      throw new ConflictError('Existem anotações associadas a este grupo')
    }

    await this.groupsRepo.delete(id)

    return {
      statusCode: 200,
      body: {}
    }
  }
}