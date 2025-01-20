import { randomUUID } from 'node:crypto'

export class Group {
  #props

  constructor({ projectId, ownerId, name, membersIds, annotationsCount }, id) {
    this.#props = { projectId, ownerId, name, membersIds, annotationsCount }
    this.id = id ?? randomUUID()
  }

  get projectId() {
    return this.#props.projectId
  }

  get ownerId() {
    return this.#props.ownerId
  }
  
  get name() {
    return this.#props.name
  }
  
  get membersIds() {
    return this.#props.membersIds
  }
  
  get annotationsCount() {
    return this.#props.annotationsCount
  }

  logProps() {
    console.log(this.#props)
  }
}