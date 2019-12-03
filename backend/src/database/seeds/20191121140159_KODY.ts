import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.kody").del()
  .then(() => { 
    return knex.raw(`
      insert into m.kody values 
       (1,'521','0','Riadna dovolenka','t','t','t','t','t','t','t','t','t','t','t','t','D','f','A',100.0,0.0,'f','t','f','t','f','521.1','331.1','t',54,124,14,0,'f',0.0,0,0.0,0,' ','   ','t'),
       (2,'811','0','Nemoc','f','f','f','f','f','f','f','f','f','f','f','f','D','t','A',0.0,0.0,'f','t','f','f','f','521.1','331.1','t',80,140,40,0,'t',25.0,3,55.0,7,' ','   ','t')
  `);
  });
};
