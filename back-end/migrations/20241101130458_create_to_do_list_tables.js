/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
    .createTable('to_do_list_usersteste', (table) => {
      table.string('id', 64).primary();
      table.string('name', 64).notNullable();
      table.string('email', 64).unique().notNullable();
      table.string('password', 64).notNullable();
    })
    .createTable('to_do_list_tasksteste', (table) => {
      table.string('id', 64).primary();
      table.string('title', 64).notNullable();
      table.string('description', 1024).defaultTo('No description provided');
      table.date('deadline');
      table.enu('status', ['pending', 'progress', 'completed']).defaultTo('pending');
      table.string('author_id', 64).references('id').inTable('to_do_list_users');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('to_do_list_assigneesteste', (table) => {
      table.string('task_id', 64).references('id').inTable('to_do_list_tasks');
      table.string('assignee_id', 64).references('id').inTable('to_do_list_users');
      table.primary(['task_id', 'assignee_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('to_do_list_assigneesteste')
    .dropTableIfExists('to_do_list_tasksteste')
    .dropTableIfExists('to_do_list_usersteste');
};
