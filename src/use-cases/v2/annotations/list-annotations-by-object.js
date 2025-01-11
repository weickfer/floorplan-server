import { AnnotationMapper } from "../../../mappers/annotation.js";

export class ListAnnotationsByObjectUseCase {
  constructor(
    annotationsRepo
  ) {
    this.annotationsRepo = annotationsRepo;
  }

  async execute({ userId, roles, projectId, objectId }) {
    const relationships = await this.annotationsRepo.listRelationships(projectId)

    const relationshipsFiltered = relationships.filter(
      relation => relation.externalObjectId === objectId
    ).map((relationship) => {
      switch (relationship.visibility) {
        case 'public':
          return relationship
        case 'draft':
          if(relationship.userId === userId) {
            return relationship
          }
          break
        case 'group':
          if(relationship.members.includes(userId)) {
            return relationship
          }
          break
        case 'admin':
          const isAdmin = roles.includes('admin')

          if(isAdmin || relationship.ownerId === userId) {
            return relationship
          }
          break
      }
    }).filter(Boolean)
    const annotationsIds = relationshipsFiltered.map(relationship => relationship.id)
    const visibleAnnotations = await this.annotationsRepo.listByIDs(annotationsIds)

    return {
      statusCode: 200,
      body: visibleAnnotations.map(AnnotationMapper.toHttp)
    }
  }
}