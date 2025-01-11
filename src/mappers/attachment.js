import { Attachment } from "../entities/attachment.js";

export class AttachmentMapper {
  static toEntity(data) {
    return new Attachment({
      name: data.name,
      publicUrl: data.publicUrl,
      vectors: data.vectors
    }, data.id)
  }
  
  static toHttp(entity) {
    return {
      id: entity.id,
      name: entity.name,
      publicUrl: entity.publicUrl,
      vectors: entity.vectors,
    }
  }
}