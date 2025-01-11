import { randomUUID } from 'node:crypto'

export class Attachment {
  #props

  constructor({ annotationId, name, vectors, publicUrl }, id) {
    this.#props = { name, vectors, publicUrl, annotationId }
    this.id = id ?? randomUUID()
  }

  get annotationId() {
    return this.#props.annotationId
  }
  
  get name() {
    return this.#props.name
  }

  get vectors() {
    return this.#props.vectors
  }

  get publicUrl() {
    return this.#props.publicUrl
  }
}
