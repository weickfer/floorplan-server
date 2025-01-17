import { k } from "../../lib/knex.js";
import { ProjectMapper } from "../../mappers/project.js";

export class KnexProjectsRepository {
  constructor() {}

  async findByExternalId(externalId) {
    const project = await k('projects')
      .where({ externalId })
      .select(
        'projects.*',
        k.raw(`
          (
            SELECT json_agg(annotations.id)
            FROM annotations
            WHERE annotations."projectId" = projects.id
          ) as annotations
        `)
      )
      .first()

    if(!project) return null

    return ProjectMapper.toEntity(project)
  }

  async findById(id) {
    const project = await k('projects')
    .where({ id })
    .select(
      'projects.*',
      k.raw(`
        (
          SELECT json_agg(
            json_build_object(
              'id', groups.id,
              'name', groups.name,
              'ownerId', groups."ownerId",
              'membersIds', (
                SELECT json_agg(group_members."memberId")
                FROM group_members
                WHERE group_members."groupId" = groups.id
              )
            )
          )
          FROM groups
          WHERE groups."projectId" = projects.id
        ) as groups
      `),
      k.raw(`
        (
          SELECT json_agg(row_to_json(project_disciplines))
          FROM project_disciplines
          WHERE project_disciplines."projectId" = projects.id
        ) as disciplines
      `),
    )
    .first()

    if(!project) return null;

    return ProjectMapper.toEntity(project)
  }

  async create({ id, name, externalId }) {
    await k('projects').insert({ id, name, externalId })
  }
  
  async delete(id) {
    await k('projects').where('id', id).delete()
  }
}