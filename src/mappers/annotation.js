import { Annotation } from "../entities/annotation.js";
import { AttachmentMapper } from "./attachment.js";
import { DisciplineMapper } from "./discipline.js";

export class AnnotationMapper {
  static toEntity(persistedData) {
    const attachments = persistedData.attachments?.map(attachment => AttachmentMapper.toEntity(attachment)) ?? []
    const disciplines = persistedData.disciplines?.map(discipline => DisciplineMapper.toEntity(discipline)) ?? []

    return new Annotation({
      title: persistedData.title,
      description: persistedData.description,
      userId: persistedData.userId,
      visibility: persistedData.visibility,
      priority: persistedData.priority,
      groupId: persistedData.groupId,
      projectId: persistedData.projectId,
      externalObjectId: persistedData.externalObjectId,
      attachments,
      disciplines
    }, persistedData.id)
  }

  static toHttp(entity) {
    const attachments = entity.attachments?.map(attachment => AttachmentMapper.toHttp(attachment)) ?? []
    const disciplines = entity.disciplines?.map(discipline => DisciplineMapper.toHttp(discipline)) ?? []

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      userId: entity.userId,
      visibility: entity.visibility,
      priority: entity.priority,
      groupId: entity.groupId,
      externalObjectId: entity.externalObjectId,
      attachments,
      disciplines,
    }
  }
}