import { Group } from "../../../entities/group.js"
import { createGroupSchema } from "../../../lib/zod/schemas/group.js"

export class CreateGroupUseCase {
  constructor(
    groupsRepo,
  ) {
    this.groupsRepo = groupsRepo
  }

  async execute({ projectId, userId, ...data }) {
    const { name, members } = await createGroupSchema.parseAsync(data)

    const group = new Group({
      projectId,
      ownerId: userId,
      name,
      membersIds: [...members, userId]
    })

    await this.groupsRepo.create(group)

    return {
      statusCode: 201,
      body: {}
    }
  }
}