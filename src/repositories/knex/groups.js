import { k } from "../../lib/knex.js";
import { GroupMapper } from "../../mappers/group.js";

export class KnexGroupsRepository {
  async create({ id, projectId, ownerId, name, membersIds }) {
    await k('groups').insert({
      id, projectId, ownerId, name
    })

    const members = membersIds.map(memberId => ({
      groupId: id,
      memberId,
    }))

    await k('group_members').insert(members)
  }

  async findMembers(groupId) {
    const groupMembers = await k('group_members').where({
      groupId
    }).pluck('memberId')

    return groupMembers
  }

  async list(projectId) {
    const groups = await k('groups')
      .where('groups.projectId', projectId)
      .select(
        '*',
        k.raw(`
          (
            SELECT json_agg(group_members."memberId")
            FROM group_members
            WHERE group_members."groupId" = groups.id
          ) AS "membersIds"
        `)
      )

    return groups.map(GroupMapper.toEntity)
  }

  async findById(id) {
    const group = await k('groups')
      .where({ id })
      .select(
        'groups.*',
        k.raw(`
          (
            SELECT COUNT(*)
            FROM annotations
            WHERE annotations."groupId" = groups.id
          ) as "annotationsCount"
        `),
        k.raw(`
          (
            SELECT json_agg(group_members."memberId")
            FROM group_members
            WHERE group_members."groupId" = groups.id
          ) AS "membersIds"
        `)
      )
      .first()

    if(!group) return null

    return GroupMapper.toEntity(group)
  }
  
  async delete(id) {
    await k('groups').where('id', id).delete()
  }

  async update({ id, name, membersIds }) {
    await k('groups').where('id', id).update({
      name
    })

    const newMembers = membersIds.map(memberId => ({
      groupId: id,
      memberId,
    }))

    if(newMembers.length === 0) return

    await k('group_members').insert(newMembers)
  }

  async removeMember(memberId) {
    await k.raw(`
      DELETE FROM group_members WHERE group_members."memberId" = ?
    `, [memberId])
  }
}