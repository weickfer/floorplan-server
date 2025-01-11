import { ProjectDiscipline } from "../entities/project-discipline.js";

export class ProjectDisciplineMapper {
  static toEntity(data) {
    return new ProjectDiscipline({
      name: data.name,
      slug: data.slug,
      projectId: data.projectId,
      type: data.type,
    }, data.id)
  }

  static toHttp(entity) {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      type: entity.type,
    }
  }
}