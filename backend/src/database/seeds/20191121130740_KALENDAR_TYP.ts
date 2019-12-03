import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.kalendar_typ").del()
  .then(() => { 
    return knex.raw(`
    INSERT INTO m.kalendar_typ VALUES (1,'8.0 hod/mes','M',173.92,40.0,8.0,8.0,5.0,21.74,'pozn');
  `);
  });
};
