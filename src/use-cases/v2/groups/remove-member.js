import { NotFoundError, UnauthorizedError } from "../../../infra/errors/4xx.js"
import { removeMemberSchema } from "../../../lib/zod/schemas/group.js"

export class RemoveMemberUseCase {
  constructor(
    groupsRepo
  ) {
    this.groupsRepo = groupsRepo
  }

  async execute({ id: groupId, userId, memberId }) {
    await removeMemberSchema.parseAsync({ memberId })

    const group = await this.groupsRepo.findById(groupId)

    if (!group) {
      throw new NotFoundError('Grupo não existe')
    }

    if (group.ownerId !== userId) {
      throw new UnauthorizedError('Somente o dono do grupo pode fazer essa operação')
    }

    await this.groupsRepo.removeMember(memberId)

    return {
      statusCode: 204,
      body: {}
    }
  }
}