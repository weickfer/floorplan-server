import { BadRequestError, ConflictError, NotFoundError } from '../../../infra/errors/4xx.js'

import { Annotation } from '../../../entities/annotation.js'
import { Attachment } from '../../../entities/attachment.js'
import { createAnnotationSchema } from '../../../lib/zod/schemas/annotation.js'

export class CreateAnnotationUseCase {
  constructor(
    annotationsRepo,
    projectDisciplinesRepo,
    attachmentsRepo,
    groupsRepo,
    storageProvider,
  ) {
    this.annotationsRepo = annotationsRepo
    this.projectDisciplinesRepo = projectDisciplinesRepo
    this.attachmentsRepo = attachmentsRepo
    this.groupsRepo = groupsRepo
    this.storageProvider = storageProvider
  }

  async execute({ userId, projectId, ...data }) {
    const { 
      objectId, 
      title, 
      description, 
      disciplines, 
      visibility,
      priority,
      groupId,
      attachments = [],
    } = await createAnnotationSchema.parseAsync(data)
    
    const disciplinesExists = await this.projectDisciplinesRepo.exists(
      disciplines.map(discipline => discipline.disciplineId)
    )

    if (!disciplinesExists) {
      throw new NotFoundError('Disciplinas inclusas não existem')
    }

    const annotation = new Annotation({
      externalObjectId: objectId, 
      title, 
      description, 
      attachments, 
      userId, 
      visibility,
      priority,
      disciplines,
      projectId,
    })

    if(visibility === 'group' && !groupId) {
      throw new BadRequestError("groupId deveria estar incluso quando visibility é 'group'")
    }

    if(visibility === 'group' && groupId) {
      const members = await this.groupsRepo.findMembers(groupId)

      if(members?.length === 0) {
        throw new NotFoundError('O grupo não existe ou sem membros')
      }

      if(!members.includes(userId)) {
        throw new ConflictError('Você não pertence a esse grupo')
      }

      annotation.setGroupId(groupId)
    }

    const annotationAttachments = await Promise.all(attachments.map(
      async attach => {
        const { publicUrl, signedUrl } = await this.storageProvider.createFile(attach.name)
        return {
          name: attach.name,
          publicUrl,
          signedUrl,
          vectors: attach.vectors
        }
      }
    ))

    const newAttachments = annotationAttachments.map(attach => new Attachment({
      annotationId: annotation.id,
      name: attach.name,
      publicUrl: attach.publicUrl,
      vectors: attach.vectors,
    }))
  

    await this.annotationsRepo.create(annotation)
    await this.attachmentsRepo.createMany(newAttachments)

    return { 
      statusCode: 201, 
      body: {
        signedUrls: annotationAttachments.reduce((acc, curr) => {
          acc[curr.name] = curr.signedUrl

          return acc
        }, {})
      } 
    }
  }
}