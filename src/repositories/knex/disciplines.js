import { k } from "../../lib/knex.js";

export class KnexDisciplinesRepository {
  async create({ id, name, slug }) {
    await k('disciplines').insert({
      id, name, slug
    })
  }

  async exists(ids) {
    const disciplines = await k('disciplines')
      .select('id')
      .whereIn('id', ids);

    return ids.every(id => disciplines.map(d => d.id).includes(id));
  }

  async listByIDs(ids) {
    const disciplines = await k('disciplines')
      .select('*')
      .whereIn('id', ids);

    return disciplines
  }

  async list() {
    const disciplines = await k('disciplines').select('*')

    return disciplines
  }
}