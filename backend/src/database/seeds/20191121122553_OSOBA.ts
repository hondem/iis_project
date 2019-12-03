import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.osoba").del()
  .then(() => { 
    return knex.raw(`
      INSERT INTO m.osoba VALUES 
      (1,'1','Ludovít',' ','Burger',' ','t','konateľ',' ',' ',' ','100',' ',' ',' ',' ','ludovit@gmail.com','rc','05.06.1962','M','SK','Ilava','Z','OP','PAS','ulica','c','c','01851','Ilava','okres','kraj','stat','ulica','c','c','psc','mesto','okr','kraj','stat','01.01.2009','01.12.2099',' ', 1),
      (2,'2','Martina',' ','Burgerova',' ','t','asistent',' ',' ',' ','100',' ',' ',' ',' ','martina@gmail.com','rc','05.05.1968','F','SK','Ilava','Z','OP','PAS','ulica','c','c','01581','Ilava','okres','kraj','stat','ulica','c','c','psc','mesto','okr','kraj','stat','01.01.2010','01.12.2099',' ', 1),
      (3,'3','Jozef',' ','Hrushka',' ','t','Šéf vedúci',' ',' ',' ','100',' ',' ',' ',' ','xhrusk25@stud.fit.vutbr.cz','rc','05.05.1968','F','SK','Ilava','Z','OP','PAS','ulica','c','c','01581','Ilava','okres','kraj','stat','ulica','c','c','psc','mesto','okr','kraj','stat','01.01.2010','01.12.2099',' ', 1),
      (4,'4','Aleš',' ','Sedlackovic',' ','t','Windows manager',' ',' ',' ','100',' ',' ',' ',' ','ales@hotmail.cz','rc','05.05.1968','F','SK','Ilava','Z','OP','PAS','ulica','c','c','01581','Ilava','okres','kraj','stat','ulica','c','c','psc','mesto','okr','kraj','stat','01.01.2010','01.12.2099',' ', 1);
    `); 
  });
};
