/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('groups', (table) => {
      table.uuid('id').primary()
      table.text('name').notNullable()
      table.text('ownerId').notNullable()
    })
    .createTable('group_members', (table) => {
      table.uuid('groupId').references('id').inTable('groups').onDelete('CASCADE')
      table.text('memberId').notNullable()
    })
    .alterTable('annotations', (table) => {
      table.uuid('groupId').nullable().references('id').inTable('groups').onDelete('SET NULL')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('group_members')
    .alterTable('annotations', (table) => {
      table.dropColumn('groupId')
    })
    .dropTable('groups')
};
