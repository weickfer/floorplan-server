import { Attachment } from '../../entities/attachment.js';
import { k } from '../../lib/knex.js';

export class KnexAttachmentsRepository {
  /**
   * @param {Array<Attachment>} attachments
   */
  async createMany(attachments) {
    const data = attachments.map(attachment => ({
      id: attachment.id,
      name: attachment.name,
      publicUrl: attachment.publicUrl,
      vectors: Array.isArray(attachment.vectors) ? JSON.stringify(attachment.vectors) : [],
      annotationId: attachment.annotationId,
    }))

    await k('attachments').insert(data);
  }
}
