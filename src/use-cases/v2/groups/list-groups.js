import { GroupMapper } from "../../../mappers/group.js"

export class ListGroupsUseCase {
  constructor(
    groupsRepo,
  ) {
    this.groupsRepo = groupsRepo
  }

  async execute({ projectId }) {
    const groups = await this.groupsRepo.list(projectId)
    
    return {
      statusCode: 200,
      body: groups.map(GroupMapper.toHttp)
    }
  }
}