import { Discipline } from "../entities/discipline.js";

export class DisciplineMapper {
  static toEntity(data) {
    return new Discipline({
      name: data.name,
      slug: data.slug,
      completedIn: data.completedIn,
      deadline: data.deadline,
      status: data.status,
    }, data.id)
  }

  static toHttp(entity) {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      completedIn: entity.completedIn,
      deadline: entity.deadline,
      status: entity.status,
    }
  }
}
