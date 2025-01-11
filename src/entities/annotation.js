import { randomUUID } from 'node:crypto'

export class Annotation {
  #props

  constructor({
    externalObjectId,
    title,
    description,
    visibility,
    priority,
    disciplines,
    attachments,
    userId,
    groupId = null,
    projectId,
  }, id) {
    this.#props = { externalObjectId, title, description, visibility, priority, disciplines, attachments, userId, groupId, projectId }
    this.id = id ?? randomUUID()
  }

  setGroupId(groupId) {
    this.#props.groupId = groupId
  }

  get externalObjectId() {
    return this.#props.externalObjectId
  }
  
  get title() {
    return this.#props.title
  }

  get description() {
    return this.#props.description
  }

  get visibility() {
    return this.#props.visibility
  }
  
  get priority() {
    return this.#props.priority
  }

  get disciplines() {
    return this.#props.disciplines
  }

  get attachments() {
    return this.#props.attachments
  }

  get userId() {
    return this.#props.userId
  }

  get groupId() {
    return this.#props.groupId
  }
  
  get projectId() {
    return this.#props.projectId
  }
}
