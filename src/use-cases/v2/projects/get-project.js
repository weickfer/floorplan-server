import { ProjectMapper } from "../../../mappers/project.js";

export class GetProjectUseCase {
  constructor(projectsRepo) {
    this.projectsRepo = projectsRepo;
  }
  
  async execute({ projectId }) {
    const project = await this.projectsRepo.findById(projectId)
    
    return {
      statusCode: 200,
      body: ProjectMapper.toHttp(project),
    }
  }
}