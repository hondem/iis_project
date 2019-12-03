import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.withSchema('m')
    .createTable('osoba', (table => {
      table.increments('id')
        .primary(),
      table.string("osobne_cislo", 10).notNullable(),
      table.string("meno", 255).notNullable(),
      table.string("stredne_meno", 255),
      table.string("priezvisko", 255).notNullable(),
      table.string("externe_osobne_cislo", 20),
      table.boolean("aktivny")
        .notNullable()
        .comment('udaj oznacuje ci je mozne s danym zaznamom pracovat alebo nie. Nie - nevyberie sa pre spracovanie miezd'),
      table.string("funkcia", 50),
      table.string("pozicia", 50),
      table.string("oddelenie", 20),
      table.string("pobocka", 20),
      table.string("stredisko", 10),
      table.string("telefon_pracovny", 25),
      table.string("telefon_sukromny", 25),
      table.string("telefon_iny", 25),
      table.string("skype", 100),
      table.string("email", 100),
      table.string("rodne_cislo", 10),
      table.date("datum_nar"),
      table.string("pohlavie", 1),
      table.string("statna_prislusnost", 20),
      table.string("miesto_narodenia", 100),
      table.string("stav", 1).comment('zenaty,slobodny'),
      table.string("obciansky", 25),
      table.string("pas", 25),
      table.string("adresa_ulica_trvale", 100),
      table.string("adresa_cislo_popisne_trvale", 100),
      table.string("adresa_cislo_domu_trvale", 100),
      table.string("psc_trvale", 6),
      table.string("mesto_trvale", 100),
      table.string("okres_trvale", 100),
      table.string("kraj_trvale", 100),
      table.string("krajina_trvale", 100),
      table.string("adresa_ulica_prechodne", 100),
      table.string("adresa_cislo_popisne_prechodne", 100),
      table.string("adresa_cislo_domu_prechodne", 100),
      table.string("psc_prechodne", 6),
      table.string("mesto_prechodne", 100),
      table.string("okres_prechodne", 100),
      table.string("kraj_prechodne", 100),
      table.string("krajina_prechodne", 100),
      table.date("nastup")
        .notNullable()
        .comment('datum zaciatku pracovneho pomeru'),
      table.date("ukoncenie")
        .notNullable()
        .comment('datum ukoncenia pracovneho pomeru'),
      table.string("pozn", 255)
    }))
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.osoba CASCADE;`);
}

