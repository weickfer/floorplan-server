import { k } from '../../lib/knex.js'
import { AnnotationMapper } from '../../mappers/annotation.js'

export class KnexAnnotationsRepository {
  async create({ id, externalObjectId, title, description, visibility, priority, groupId, disciplines, userId, projectId }) {
    await k('annotations').insert({
      id,
      userId,
      externalObjectId,
      title,
      description,
      visibility,
      priority,
      groupId,
      projectId,
    })

    // const persistedDisciplines = await k('disciplines').whereIn(
    //   'slug', 
    //   disciplines.map(d => d.name)
    // )



    const annotationDisciplines = disciplines.map(discipline => ({
      ...discipline,
      annotationId: id,
    }))
    
    await k('annotation_disciplines').insert(annotationDisciplines)
  }

  async listRelationships(projectId) {
    const annotations = await k.raw(`
      SELECT
        annotations.id,
        annotations."groupId",
        annotations.visibility,
        annotations."userId",
        annotations."externalObjectId",
        groups."ownerId",
        group_members."memberId"
      FROM annotations 
      LEFT JOIN groups ON annotations."groupId" = groups.id 
      LEFT JOIN group_members ON groups.id = group_members."groupId"
      WHERE annotations."projectId" = ?;
    `, [projectId])

    const nested = annotations?.rows.reduce((acc, row) => {
      let annotation = acc?.find(a => a.id === row.id)

      if(!annotation) {
        annotation = {
          id: row.id,
          userId: row.userId,
          visibility: row.visibility,
          externalObjectId: row.externalObjectId,
          ownerId: row.ownerId,
          members: []
        }
        acc.push(annotation)
      }

      if(row.memberId) {
        annotation.members.push(row.memberId)
      }


      return acc
    }, [])

    return nested
  }

  async listByIDs(ids) {
    const annotations = await k('annotations')
      .whereIn('annotations.id', ids)
      .select(
        'annotations.*',
        /**
        (
            SELECT json_agg(annotation_disciplines)
            FROM annotation_disciplines
            JOIN annotation_disciplines ON annotation_disciplines.id = annotation_disciplines."disciplineId"
            WHERE annotation_disciplines."annotationId" = annotations.id
          ) AS annotation_disciplines
         */
          k.raw(`
          (
            SELECT json_agg(
              json_build_object(
                'id', annotation_disciplines."disciplineId",
                'deadline', annotation_disciplines.deadline,
                'completedIn', annotation_disciplines."completedIn",
                'status', annotation_disciplines.status,
                'name', project_disciplines.name,
                'slug', project_disciplines.slug
              )
            )
            FROM annotation_disciplines
            LEFT JOIN project_disciplines ON annotation_disciplines."disciplineId" = project_disciplines.id
            WHERE annotation_disciplines."annotationId" = annotations.id
          ) AS disciplines
        `),
        k.raw(`
          (
            SELECT json_agg(attachments)
            FROM attachments
            WHERE attachments."annotationId" = annotations.id
          ) as attachments
        `),
      )

    return annotations.map(annotation => AnnotationMapper.toEntity(annotation))
  }

  async findById(id) {
    const annotation = await k('annotations')
      .where({ id })
      .select(
        'annotations.*',
        k.raw(`
          (
            SELECT json_agg(attachments)
            FROM attachments
            WHERE attachments."annotationId" = annotations.id
          ) as attachments
        `),
      ).first()

    if(!annotation) return null

    return AnnotationMapper.toEntity(annotation)
  }

  async delete(id) {
    await k('annotations').where('id', id).delete()
  }
}