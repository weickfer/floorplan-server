import { k } from "../../lib/knex.js";
import { ProjectDisciplineMapper } from "../../mappers/project-discipline.js";

export class KnexProjectDisciplinesRepository {
  constructor() {}

  async create({ id, name, slug, type, projectId }) {
    await k('project_disciplines').insert({
      id,
      name,
      slug,
      type,
      projectId,
    })
  }
  
  async create(disciplines) {
    await k('project_disciplines').insert(
      disciplines.map(discipline => ({
        id: discipline.id,
        name: discipline.name,
        slug: discipline.slug,
        type: discipline.type,
        projectId: discipline.projectId
      }))
    )
  }

  async list(projectId) {
    const disciplines = await k('project_disciplines').where('projectId', projectId).select('*')

    return disciplines.map(
      discipline => ProjectDisciplineMapper.toEntity(discipline)
    )
  }

  async exists(ids) {
    const disciplines = await k('project_disciplines')
      .select('id')
      .whereIn('id', ids);

    return ids.every(id => disciplines.map(d => d.id).includes(id));
  }

  async findById(id) {
    const discipline = await k('project_disciplines')
    .where({ id })
    .select(
      'project_disciplines.*',
      k.raw(`
        (
          SELECT COUNT(*)
          FROM annotation_disciplines
          WHERE annotation_disciplines."disciplineId" = project_disciplines.id
        ) as "annotationsCount"
      `)
    ).first()

    if(!discipline) return null;

    return ProjectDisciplineMapper.toEntity(discipline)
  }

  async delete(id) {
    await k('project_disciplines').where('id', id).delete()
  }
}