import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.withSchema('m')
    .createTable('zlozky', (table => {
      table.increments('id').primary(),
      table.integer('os_id')
        .notNullable()
        .references('id')
        .inTable('m.osoba')
        .onDelete('CASCADE')
        .comment('id osoby z tabulky osoba'),
      table.integer('kod')
        .notNullable()
        .references('id')
        .inTable('m.kody')
        .onDelete('CASCADE')
        .comment('id kod mzdovej zlozky z tabulky kody'),
      table.string("kod_ext", 10)
        .comment('externy kod mzdovej zlozky z tabulky kody, iba pokial chce zakaznik pouzit svoje cislo pre kod'),
      table.date("datum_od")
        .notNullable()
        .comment('datum platnosti od'),
      table.date("datum_do")
        .notNullable()
        .comment('datum platnosti do'),
      table.string("pozn", 30),
      table.comment('Mzdove odchylky, v tabulke su zaznamenane datumove, hodinove a hodnotove udaje potrebne pre vypocet mzdy pomocou kodov.')
    }))
}

export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.zlozky CASCADE;`);
}

