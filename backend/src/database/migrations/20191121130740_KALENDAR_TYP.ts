import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
    CREATE TABLE m.kalendar_typ(
        "id" int not null PRIMARY KEY,
        "nazov" char(30) not null,
        "typ" char(1) not null,
        "mesiac_hod" float8 not null,
        "tyzden_hod" float8 not null,
        "den_hod" float8 not null,
        "pomer_hod" float8 not null,
        "dni_v_tyzdni" float8 not null,
        "dni_v_mes" float8 not null,
        "pozn" char(50) not null
      );
      
      COMMENT ON table m.kalendar_typ IS 'Hlavicka kalendara obsahujuca zakladne udaje ku kalendaru ako su pocet hodin a pocet dni';
      COMMENT ON COLUMN m.kalendar_typ.id IS 'cislo kalendara jednojednoznacne (mandatory)';
      COMMENT ON COLUMN m.kalendar_typ.mesiac_hod IS 'Priemerny pocet pracovnych hodin za mesiac';
      COMMENT ON COLUMN m.kalendar_typ.tyzden_hod IS 'Pocet pracovnych hodin za tyzden';
      COMMENT ON COLUMN m.kalendar_typ.den_hod IS 'Pocet pracovnych hodin za den';
      COMMENT ON COLUMN m.kalendar_typ.pomer_hod IS 'Pomerne hodiny';
      COMMENT ON COLUMN m.kalendar_typ.dni_v_tyzdni IS 'pocet pracovnych dni v tyzdni pre dany kalendar';
      COMMENT ON COLUMN m.kalendar_typ.dni_v_tyzdni IS 'priemerny pocet pracovnych dni v mesiaci pre dany kalendar';`)
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.kalendar_typ CASCADE;`);
}

