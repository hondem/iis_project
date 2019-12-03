import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.withSchema('m')
    .createTable('udaje', (table => {
      table.integer('id')
        .notNullable()
        .references('id')
        .inTable('m.osoba')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .comment('id pacovnika (osc)'),
      table.date("platnost_od")
        .notNullable()
        .comment('datum platnosti zaznamu - plati od datum bude mat den vzdy 1. napr 01.05.2019'),
      table.string("druh", 1)
        .notNullable()
        .comment('pracovneho pomeru default:H, H-Hlavny, V-vedlajsi, B-Brigada'),
      table.string("trieda", 2)
        .notNullable()
        .comment('kodove oznacenie platobnej triedy napr 01,02, 03, A1, A2, ...  default hodnota medzera'),
      table.string("pracovna_doba_typ", 1)
        .notNullable()
        .comment('typ pracovnej doby aka druh mzdy hodnoty: M - mesacena | H - hodinova.'),
      table.integer("kalendar_typ")
        .notNullable()
        .references('id')
        .inTable('m.kalendar_typ')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .comment('kod kalendara z tabulky kalendar_typ urcuje pocet prac. dni a pocet sviatkov, pocet hodin prac.dni a pocet hodin sviatkov,'),
      table.integer("uvazok")
        .notNullable()
        .comment('ciselne oznacenie percentualneho vyjadrenia uvazku. vacsinou 100%, default hodnota 100'),
      table.string("vypocet_sviatkov", 1)
        .notNullable()
        .comment('sposob prepoctu sviatkov P - priemerom, T - tarifom , default hodnota T'),
      table.boolean("pracovny_pomer_nad_5dni")
        .notNullable()
        .comment('logicka premenna urcuje ci pracovnik pracuje viac ako 5 dni. Vacsinou True, default hodnota Nie'),
      table.boolean("pracovna_schopnost_znizena1")
        .notNullable()
        .comment('znizena pracovna schopnost 1.kategoria (hodnoty  Ano/NIE), default hodnota Nie'),
      table.boolean("pracovna_schopnost_znizena2")
        .notNullable()
        .comment('znizena pracovna schopnost 2.kategoria (hodnoty  Ano/NIE), default hodnota Nie'),
      table.boolean("pracovna_schopnost_znizena3")
        .notNullable()
        .comment('znizena pracovna schopnost 3.kategoria (hodnoty  Ano/NIE), default hodnota Nie'),
      table.string("pracovna_kategoria", 1)
        .notNullable()
        .comment('statisticky udaj - 1-6, default 1'),
      table.string("staticticky_udaj", 1)
        .notNullable()
        .comment('statisticky udaj, default hodnota medzera,'),
      table.string("specialna_kategoria", 1)
        .notNullable()
        .comment('statisticky udaj, default hodnota medzera'),
      table.boolean("dochodca")
        .notNullable()
        .comment('Ano/Nie, udava ci je dany clovek dochodca, default hodnota Nie'),
      table.string("dochodok_typ", 1)
        .notNullable()
        .comment('typ dochodku, default medzera, hodnoty S-starobny, ...'),
      table.integer("pocet_deti", 1)
        .notNullable()
        .comment('udava celkovy pocet deti pracovnika pre danovy bonus, default hodnota 0'),
      table.integer("pocet_deti_do_6")
        .notNullable()
        .comment('udava pocet deti pracovnika pre danovy bonus do 6 rokov, default hodnota 0'),
      table.boolean("danovy_odpocet_manzelka")
        .notNullable()
        .comment('udava, ci si pracovnik uplatnuje danovy odpocet na manzelku, default hodnota Nie'),
      table.boolean("danovy_bonus")
        .notNullable()
        .comment('udava, ci si uplatnuje danovy bonus na deti, default hodnota Nie'),
      table.boolean("nezdanitelne_min")
        .notNullable()
        .comment('udava ci si uplatnuje nezdanitelne minimum, default hodnota Nie'),
      table.integer("zdravotna_poistovna", 1)
        .notNullable()
        .comment('udava cislo zdravotnej poistovne - hodnoty su: 24-DÔVERA zdravotná poisťovňa, a. s., 25-VŠEOBECNÁ zdravotná poisťovňa, a. s., .27 -UNION zdravotná poisťovňa, a. s.'),
      table.boolean("zc_zp")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita zdravotne poistenie za zamestnanca, default hodnota Ano'),
      table.boolean("zc_sp_dp")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita socialne poistenie (dochodkove a invalidne)za zamestnanca, default hodnota Ano'),
      table.boolean("zc_sp_np")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita nemocenske poistenie za zamestnanca, default hodnota Ano'),
      table.boolean("zc_sp_pvn")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita poistenie v nezamestnanosti za zamestnanca, default hodnota Ano'),
      table.boolean("zl_zp")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita zdravotne poistenie za zamestnavatela, default hodnota Ano'),
      table.boolean("zl_sp_dp")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita socialne poistenie za zamestnavatela, default hodnota Ano'),
      table.boolean("zl_sp_np")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita nemocenske poistenie za zamestnavatela, default hodnota Ano'),
      table.boolean("zl_sp_pvn")
        .notNullable()
        .comment(' udava ci sa pracovnikovi pocita poistenie v nezamestnanosti za zamestnavatela, default hodnota Ano'),
      table.string("odbory", 1)
        .notNullable()
        .comment('clenstvo v odboroch, default hodnota Nie')
      table.float('tarif').notNullable()
      table.primary(['id','platnost_od'])
    }))
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.udaje CASCADE;`);
}

