import { Group } from "../entities/group.js";

export class GroupMapper {
  static toEntity(data) {
    return new Group({
      name: data.name,
      membersIds: data.membersIds,
      ownerId: data.ownerId,
      projectId: data.projectId
    }, data.id)
  }

  static toHttp(entity) {
    return {
      id: entity.id,
      name: entity.name,
      members: entity.membersIds,
      projectId: entity.projectId,
      ownerId: entity.ownerId,
    }
  }
}