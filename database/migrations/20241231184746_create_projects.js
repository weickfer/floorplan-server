/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('projects', (table) => {
      table.uuid('id').primary()
      table.text('externalId').unique().notNullable()
      table.text('name').notNullable()
    }).alterTable('annotations', (table) => {
      table.uuid('projectId').references('id').inTable('projects').onDelete('CASCADE')
    }).alterTable('groups', (table) => {
      table.uuid('projectId').references('id').inTable('projects').onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .alterTable('annotations', (table) => {
      table.dropColumn('projectId')
    })
    .alterTable('groups', (table) => {
      table.dropColumn('projectId')
    })
    .dropTable('projects')
};
