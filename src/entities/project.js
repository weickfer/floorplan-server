import { randomUUID } from 'node:crypto'

export class Project {
  #props

  constructor({ name, externalId, annotations, groups, disciplines }, id) {
    this.#props = { name, externalId, annotations, groups, disciplines }
    this.id = id ?? randomUUID()
  }

  get name() {
    return this.#props.name
  }
  
  get externalId() {
    return this.#props.externalId
  }

  get annotations() {
    return this.#props.annotations
  }
  
  get groups() {
    return this.#props.groups
  }
  
  get disciplines() {
    return this.#props.disciplines
  }
}