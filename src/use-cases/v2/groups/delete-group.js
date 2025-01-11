import { deleteGroupSchema } from "../../../lib/zod/schemas/group.js"
import { UnauthorizedError } from '../../../infra/errors/4xx.js'

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

    await this.groupsRepo.delete(id)

    return {
      statusCode: 204,
      body: {}
    }
  }
}