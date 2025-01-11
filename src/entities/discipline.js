import { randomUUID } from 'node:crypto'

export class Discipline {
  #props

  constructor({ name, slug, status, completedIn, deadline }, id) {
    this.#props = { name, slug, status, completedIn, deadline }
    this.id = id ?? randomUUID()
  }

  get name() {
    return this.#props.name
  }
  
  get slug() {
    return this.#props.slug
  }
  
  get status() {
    return this.#props.status
  }
  
  get completedIn() {
    return this.#props.completedIn
  }
  
  get deadline() {
    return this.#props.deadline
  }
}