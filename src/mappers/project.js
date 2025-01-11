import { Project } from "../entities/project.js"
import { AnnotationMapper } from "./annotation.js"
import { GroupMapper } from "./group.js"
import { ProjectDisciplineMapper } from "./project-discipline.js"

export class ProjectMapper {
  static toEntity(data) {
    return new Project({
      name: data.name,
      externalId: data.externalId,
      annotations: data?.annotations?.map(annotation => AnnotationMapper.toEntity(annotation)) ?? [],
      disciplines: data?.disciplines?.map(discipline => ProjectDisciplineMapper.toEntity(discipline)) ?? [],
      groups: data?.groups?.map(group => GroupMapper.toEntity(group)) ?? []
    }, data.id)
  }

  static toHttp(entity) {
    return {
      id: entity.id,
      name: entity.name,
      externalId: entity.externalId,
      annotations: entity?.annotations?.map(AnnotationMapper.toHttp) ?? [],
      disciplines: entity?.disciplines?.map(ProjectDisciplineMapper.toHttp) ?? [],
      groups: entity?.groups?.map(GroupMapper.toHttp) ?? [],
    }
  }
}