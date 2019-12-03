import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.raw(`
    CREATE SCHEMA m;
    COMMENT ON SCHEMA m IS 'Mzdy';
    `)
}


export async function down(knex: Knex): Promise<any> {
    return knex.raw(`DROP SCHEMA m CASCADE;`);
}

