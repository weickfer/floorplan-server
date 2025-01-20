import { ProjectDiscipline } from '../../../entities/project-discipline.js';
import { ConflictError } from '../../../infra/errors/4xx.js';
import { addDefaultDisciplinesSchema } from '../../../lib/zod/schemas/discipline.js';

export class AddDefaultDisciplinesToProjectUseCase {
  constructor(
    disciplinesRepo,
    projectDisciplinesRepo
  ) {
    this.disciplinesRepo = disciplinesRepo;
    this.projectDisciplinesRepo = projectDisciplinesRepo;
  }

  async execute({ projectId, disciplinesIDs = [] }) {
    await addDefaultDisciplinesSchema.parseAsync({ disciplinesIDs })

    const disciplines = await this.disciplinesRepo.listByIDs(disciplinesIDs)

    if(disciplines?.length !== disciplinesIDs.length) {
      const nonExistingDisciplines = disciplinesIDs.filter(
        disciplineId => !disciplines.some(discipline => discipline.id === disciplineId)
      )

      throw new ConflictError(`
        As disciplinas: ${nonExistingDisciplines.join(', ')} não existem.
      `)
    }

    const existingDisciplines = await this.projectDisciplinesRepo.list(
      projectId
    )

    const existingDisciplinesSlugs = new Set(
      existingDisciplines.map(
        discipline => discipline.slug
      )
    )
    const newDisciplines = disciplines.filter(
      discipline => !existingDisciplinesSlugs.has(discipline.slug)
    )

    if(newDisciplines.length === 0) {
      return {
        statusCode: 201,
        body: {}
      }
    }

    const projectDisciplines = newDisciplines.map(discipline => new ProjectDiscipline({
      projectId,
      name: discipline.name,
      slug: discipline.slug,
      type: 'default'
    }))

    await this.projectDisciplinesRepo.create(projectDisciplines)

    return {
      statusCode: 201,
      body: {}
    }
  }
}