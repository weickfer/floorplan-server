/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .alterTable('annotations', (table) => {
      table.text('priority').defaultTo('medium').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
  .alterTable('annotations', (table) => {
    table.dropChecks('priority')
  })
};
