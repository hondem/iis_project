import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  // Create new table for companies
  return knex.schema.createTable('companies', (table) => {
    table.increments('id').primary()
    table.string('name')
  })

  .alterTable('m.osoba', table => {
    table.integer('spolecnost').defaultTo(null)
    table.foreign('spolecnost')
      .references('companies.id')
      .onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE companies CASCADE;`);
}

