import { NotFoundError, UnauthorizedError } from "../../../infra/errors/4xx.js"
import { deleteAnnotationSchema } from "../../../lib/zod/schemas/annotation.js"

export class DeleteAnnotationUseCase {
  constructor(
    annotationsRepo,
    attachmentsRepo,
    storageProvider
  ) {
    this.annotationsRepo = annotationsRepo
    this.attachmentsRepo = attachmentsRepo
    this.storageProvider = storageProvider
  }

  async execute({ id, userId }) {
    await deleteAnnotationSchema.parseAsync({ id })

    const annotation = await this.annotationsRepo.findById(id)

    if(!annotation) {
      throw new NotFoundError('Anotação não existe')
    }

    if(annotation.userId !== userId) {
      throw new UnauthorizedError('Somente o autor da anotação pode deletá-la')
    }

    const { attachments } = annotation

    await Promise.all(
      attachments.map(attachment => this.storageProvider.deleteFile(attachment.publicUrl))
    )

    await this.annotationsRepo.delete(id)

    return {
      statusCode: 204,
      body: {}
    }
  }
}