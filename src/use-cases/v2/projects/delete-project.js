import { NotFoundError } from "../../../infra/errors/4xx.js"
import { deleteProjectSchema } from "../../../lib/zod/schemas/project.js";

export class DeleteProjectUseCase {
  constructor(
    projectsRepo,
    annotationsRepo,
    storageProvider,
  ) {
    this.projectsRepo = projectsRepo;
    this.annotationsRepo = annotationsRepo;
    this.storageProvider = storageProvider;
  }

  async execute({ externalProjectId }) {
    await deleteProjectSchema.parseAsync({ externalProjectId })

    const project = await this.projectsRepo.findByExternalId(externalProjectId)

    if(!project) {
      throw new NotFoundError('Projeto não existe')
    }

    const annotations = await this.annotationsRepo.listByIDs(project.annotations)
    const attachments = annotations.map(annotation => annotation.attachments).flat()

    await Promise.all(
      attachments.map(attachment => this.storageProvider.deleteFile(attachment.publicUrl))
    )
    await this.projectsRepo.delete(project.id)

    return {
      statusCode: 204,
      body: {}
    }
    // puxar todos os anexos vinculados a esse projeto e deletar
    // deletar projeto
  }
}