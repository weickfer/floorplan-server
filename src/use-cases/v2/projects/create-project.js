import { Project } from "../../../entities/project.js"
import { ConflictError } from "../../../infra/errors/4xx.js"
import { createProjectSchema } from "../../../lib/zod/schemas/project.js"

export class CreateProjectUseCase {
  constructor(
    projectsRepo,
  ) {
    this.projectsRepo = projectsRepo
  }

  async execute(data) {
    const { name, externalProjectId } = await createProjectSchema.parseAsync(data)
    const alreadyExists = await this.projectsRepo.findByExternalId(externalProjectId)

    if(!!alreadyExists) {
      throw new ConflictError('Projeto já cadastrado na base de dados')
    }

    const project = new Project({
      name,
      externalId: externalProjectId,
    })

    await this.projectsRepo.create(project)

    return {
      statusCode: 201,
      body: {}
    }
  }
}