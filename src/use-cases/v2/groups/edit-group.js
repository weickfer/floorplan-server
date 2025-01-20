import { Group } from '../../../entities/group.js';
import { NotFoundError, UnauthorizedError } from "../../../infra/errors/4xx.js";
import { editGroupSchema } from '../../../lib/zod/schemas/group.js';

export class EditGroupUseCase {
  constructor(groupsRepo) {
    this.groupsRepo = groupsRepo;
  }

  async execute({ userId, id: groupId, name, addMembers }) {
    await editGroupSchema.parseAsync({ name, addMembers })
    const group = await this.groupsRepo.findById(groupId)

    if (!group) {
      throw new NotFoundError('Grupo não existe')
    }

    if (group.ownerId !== userId) {
      throw new UnauthorizedError('Somente o dono do grupo pode fazer essa operação')
    }

    const editedGroup = new Group({
      name: name ?? group.name,
      ownerId: group.ownerId,
      projectId: group.projectId,
      membersIds: addMembers ?? [],
    }, group.id)

    await this.groupsRepo.update(editedGroup)

    return {
      statusCode: 200,
      body: {}
    }
  }
}