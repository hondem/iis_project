import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.withSchema('m')
    .createTable('vypocet', (table => {
      table.integer('id')
        .notNullable()
        .references('id')
        .inTable('m.osoba')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'),
      table.date("obdobie").notNullable,
      table.string("vektor", 2000).notNullable,
      table.float("dovolenkovy_priemer").notNullable,
      table.float("nemocensky_priemer").notNullable,
      table.primary(['id', 'obdobie'])
    }))
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.vypocet CASCADE;`);
}

