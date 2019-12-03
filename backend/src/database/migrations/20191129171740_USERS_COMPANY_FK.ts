import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', table => {
    table.integer('companyId')
    table.foreign('companyId')
      .references('companies.id')
      .onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('companyId')
  })
}

