import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
    CREATE TABLE m.kalendar_sviatky (
        "datum" date PRIMARY KEY not null
      );
    COMMENT ON table m.kalendar_sviatky IS ' Obsahuje dni sviatkov';
    COMMENT ON COLUMN m.kalendar_sviatky.datum IS ' datum sviatku (napr. 01/05/2019)';
    `)
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.kalendar_sviatky CASCADE;`);
}

