/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.dropForeign('disciplineId')
    table.dropColumn('disciplineId')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.uuid('disciplineId').references('id').inTable('disciplines').onDelete('CASCADE')
  })
};
