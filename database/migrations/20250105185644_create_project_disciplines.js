/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('project_disciplines', (table) => {
    table.uuid('id').primary();
    table.uuid('projectId').references('id').inTable('projects').onDelete('CASCADE')
    table.text('type').notNullable();
    table.text('slug').notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
  })

  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.uuid('disciplineId').references('id').inTable('project_disciplines').onDelete('RESTRICT');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.dropForeign('disciplineId')
    table.dropColumn('disciplineId')
  });
  await knex.schema.dropTable('project_disciplines')
};
