import { randomUUID } from 'node:crypto'

export class ProjectDiscipline {
  #props;

  constructor({ name, slug, type, projectId }, id) {
    this.id = id ?? randomUUID()
    this.#props = { name, slug, type, projectId }
  }

  get name() {
    return this.#props.name;
  }
  
  get slug() {
    return this.#props.slug;
  }
  
  get type() {
    return this.#props.type;
  }
  
  get projectId() {
    return this.#props.projectId;
  }
  
}