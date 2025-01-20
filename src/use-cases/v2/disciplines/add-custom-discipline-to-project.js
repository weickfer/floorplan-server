import { ProjectDiscipline } from '../../../entities/project-discipline.js';
import { addCustomDisciplinesSchema } from '../../../lib/zod/schemas/discipline.js';

export class AddCustomDisciplineToProjectUseCase {
  constructor(
    projectDisciplinesRepo
  ) {
    this.projectDisciplinesRepo = projectDisciplinesRepo;
  }

  async execute({ projectId, ...data }) {
    const { name, slug } = await addCustomDisciplinesSchema.parseAsync(data)
    
    const projectDiscipline = new ProjectDiscipline({
      name,
      projectId,
      slug,
      type: 'custom'
    })

    await this.projectDisciplinesRepo.create([projectDiscipline])

    return {
      statusCode: 201,
      body: {},
    }
  }
}