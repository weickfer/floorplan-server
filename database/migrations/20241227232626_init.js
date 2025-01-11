/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('disciplines', function(table) {
      table.uuid('id').primary();
      table.text('slug').unique();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('annotations', function(table) {
      table.uuid('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('visibility').notNullable();
      table.string('userId').notNullable();
      table.timestamps(true, true);
    })
    .createTable('attachments', function(table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.json('vectors').notNullable();
      table.uuid('annotationId').references('id').inTable('annotations').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('annotation_disciplines', function(table) {
      table.uuid('annotationId').references('id').inTable('annotations').onDelete('CASCADE');
      table.uuid('disciplineId').references('id').inTable('disciplines').onDelete('CASCADE');
      table.date('deadline').notNullable()
      table.date('completedIn')
      table.text('status').notNullable()
      table.primary(['annotationId', 'disciplineId']);
    });
};

export function down(knex) {
  return knex.schema
    .dropTableIfExists('annotation_disciplines')
    .dropTableIfExists('attachments')
    .dropTableIfExists('disciplines')
    .dropTableIfExists('annotations');
};

