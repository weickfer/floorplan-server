/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {

  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.dropPrimary()
  })

  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.dropForeign('disciplineId')
  })

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
    table.primary(['annotationId', 'disciplineId']);
  })

  // return knex.schema.createTable('project_disciples', (table) => {
  //   table.uuid('id').primary();
  //   table.uuid('projectId').references('id').inTable('projects').onDelete('CASCADE')
  //   table.text('type').notNullable();
  //   table.text('slug').notNullable();
  //   table.string('name').notNullable();
  //   table.timestamps(true, true);
  // }).alterTable('annotation_disciplines', (table) => {
  //   table.dropForeign('disciplineId')
  //   table.uuid('disciplineId').references('id').inTable('project_disciples').onDelete('RESTRICT')
  // })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
export async function down(knex) {
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.dropPrimary(); // Remove a primary key existente
  });

  // Remover a nova chave estrangeira
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.dropForeign('disciplineId'); // Remove FK para 'project_disciplines'
  });

  // Adicionar a chave estrangeira original
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table
      .uuid('disciplineId')
      .references('id')
      .inTable('disciplines')
      .onDelete('CASCADE'); // Define a FK original
  });

  // Recriar a chave primária composta
  await knex.schema.alterTable('annotation_disciplines', (table) => {
    table.primary(['annotationId', 'disciplineId']); // Recria a primary key original
  });
  await knex.schema.dropTable('project_disciplines')
};
