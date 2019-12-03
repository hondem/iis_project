import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.withSchema('m')
  .createTable('kalendar', (table => {
    table.comment('Riadky kalendara osahujuce jednotlive dni v roku s vyznacenim poctu pracovnych hodin a dni a poctu dni a hodin sviatkov'),
    table.integer('typ')
      .notNullable()
      .references('id')
      .inTable('m.kalendar_typ')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .comment('cislo kalendara'),
    table.date('datum').notNullable().comment('den kalendara - datum'),
    table.float('pracovne_dni').notNullable().comment('je pracovny den (1 alebo 0)'),
    table.float('pracovne_hod').notNullable().comment('pocet pracovnych hodin pre dany den (0-24) (vacsinou 0-12)'),
    table.float('sviatky_dni').notNullable().comment('je sviatok (1 alebo 0)'),
    table.float('sviatky_hod').notNullable().comment('pocet hodin sviatku pre dany den (0-24) (vacsinou 0-8, pre 8 hodinovy pracovny cas 0 alebo 8)'),
    table.primary(['typ', 'datum'])
  }))
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.kalendar CASCADE;`);
}

