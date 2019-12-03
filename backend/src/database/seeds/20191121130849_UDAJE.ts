import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.udaje").del()
  .then(() => { 
    return knex.raw(`
      INSERT INTO m.udaje VALUES 
       (2,'2019-10-01','H','0','M',1,100.0,'P','t','f','f','f','2',' ',' ','f',' ',0,0,'f','f','t','25','t','t','t','t','t','t','t','t','f',575.0),
       (1,'2019-10-01','H','0','M',1,100.0,'P','t','f','f','f','2',' ',' ','f',' ',1,1,'f','t','t','25','t','t','t','t','t','t','t','t','f',575.0);
       `);
  });
};
