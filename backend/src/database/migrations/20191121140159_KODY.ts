import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
    CREATE TABLE m.kody (
        "id" integer not null PRIMARY KEY,
        "kod_ext" char(10) not null,
        "skupina" char(1) not null,
        "popis" char(50) not null,
        "zc_zp" boolean not null,
        "zc_sp_dp" boolean not null,
        "zc_sp_np" boolean not null,
        "zc_sp_pvn" boolean not null,
        "zl_zp" boolean not null,
        "zl_sp_d" boolean not null,
        "zl_sp_np" boolean not null,
        "zl_sp_pvn" boolean not null,
        "zl_sp_up" boolean not null,
        "zl_garancny_fond" boolean not null,
        "zl_rezervny_fond" boolean not null,
        "zl_socialny_fond" boolean not null,
        "druh_vypoctu" char(1) not null,
        "minus_sviatok" boolean not null,
        "algoritmus_koeficient" char(1) not null,
        "mesacne_nahrady" float not null,
        "tarif" float not null,
        "percpm" char(1) not null,
        "percpls" char(1) not null,
        "hodnota" boolean not null,
        "hodiny" boolean not null,
        "perceto" boolean not null,
        "ucet_md" char(30) not null,
        "ucet_dal" char(30) not null,
        "zobraz" boolean not null,
        "vysledok_hod" integer not null,
        "vysledok_suma" integer not null,
        "vysledok_dni" integer not null,
        "vysledok_pocet" integer not null,
        "vypocet_nemoc" boolean not null,
        "nemoc1_sadzba" float not null,
        "nemoc1_dni" integer not null,
        "nemoc2_sadzba" float not null,
        "nemoc2_dni" integer not null,
        "skupina_zrazok" char(1) not null,
        "druh_vynatia" char(1) not null,
        "ukoncenie" boolean not null
      );
      COMMENT ON TABLE m.kody IS 'Tabulka obsahuje kody podla ktorych sa spracuju mzdy zamestnancovi, kody z m.kody sa zadavaju do tabulky m.zlozky a podla m.zlozky sa spocita mzda';
      COMMENT ON COLUMN m.kody.id IS 'Poradove cislo kodu, ktore je primarnym klucom';
      COMMENT ON COLUMN m.kody.kod_ext IS 'Externe cislo kodu, ktore sa vyuzje pre ine triedenie vystupu, alebo pre premenovanie existujucich kodov, ak uz bol zakaznik zvyknuty na ine cislovanie kodov';
      COMMENT ON COLUMN m.kody.skupina IS '1-9:   1 – kody pre mzdy, 2- prekazky v praci, 3-priplatky, 4-odmeny, 5-nahrady, 6-dohody a odstupne, 7-ostatne osobne , 8 vyluky a mimoevidencny stav, 9-zrazky';
      COMMENT ON COLUMN m.kody.zc_zp IS 'Ma sa pocitat zdrav.poist. pre zamestnaneca (Zc)  A/N';
      COMMENT ON COLUMN m.kody.zc_sp_dp IS 'Ma sa pocitat soc.poist. Doch. Zc  (starobne a invalidne) A/N';
      COMMENT ON COLUMN m.kody.zc_sp_np IS 'Ma sa pocitat soc.poist. Nem. Zc  A/N';
      COMMENT ON COLUMN m.kody.zc_sp_pvn IS 'Ma sa pocitat fond poistenie v nezamestnaosti (Zc)  A/N';
      COMMENT ON COLUMN m.kody.zl_zp IS 'Ma sa pocitat zdrav.poist.za zamestnavatela (Zl)  A/N';
      COMMENT ON COLUMN m.kody.zl_sp_d IS 'Ma sa pocitat soc.poist. Doch. (starobne a invalidne) Zl  A/N';
      COMMENT ON COLUMN m.kody.zl_sp_np IS 'Ma sa pocitat soc.poist. Nem. Zl  A/N';
      COMMENT ON COLUMN m.kody.zl_sp_pvn IS 'Ma sa pocitat fond poistenie v nezamest. Zl  A/N';
      COMMENT ON COLUMN m.kody.zl_sp_up IS 'Ma sa pocitat urazove poistenie Zl  A/N';
      COMMENT ON COLUMN m.kody.zl_garancny_fond IS 'Ma sa pocitat garancny fond  A/N';
      COMMENT ON COLUMN m.kody.zl_rezervny_fond IS 'Ma sa pocitat rezervny fond  A/N';
      COMMENT ON COLUMN m.kody.zl_socialny_fond IS 'Ma sa pocitat socialny fond  A/N';
      COMMENT ON COLUMN m.kody.druh_vypoctu IS 'napocet hodiny a penazi A,B,C,D';
      COMMENT ON COLUMN m.kody.minus_sviatok IS 'Ci znizuje sviatok hodiny pre dany kod  A/N';
      COMMENT ON COLUMN m.kody.algoritmus_koeficient IS 'algoritmus koeficient  A,B,C';
      COMMENT ON COLUMN m.kody.mesacne_nahrady IS 'percento mesacnych nahrad';
      COMMENT ON COLUMN m.kody.tarif IS 'percento tarifu';
      COMMENT ON COLUMN m.kody.percpm IS 'percento_plus_mnimus -> Nikto nevie:: TODO';
      COMMENT ON COLUMN m.kody.percpls IS 'percento_plus 100% + N%\N%  A/N -> Nikto nevie:: TODO';
      COMMENT ON COLUMN m.kody.hodnota IS 'zadavanie hodnoty ( pri zadavani kodov pre pacovnika)  A/N';
      COMMENT ON COLUMN m.kody.hodiny IS 'zadavanie hodin ( pri zadavani kodov pre pacovnika)  A/N';
      COMMENT ON COLUMN m.kody.perceto IS 'zadavanie percent ( pri zadavani kodov pre pacovnika)  A/N';
      COMMENT ON COLUMN m.kody.ucet_md IS 'MD (ma dat) ucet pre export do uctovnictva';
      COMMENT ON COLUMN m.kody.ucet_dal IS 'DAL (dal) ucet pre export do uctovnictva  ';
      COMMENT ON COLUMN m.kody.zobraz IS 'zobrazenie kodu, je/nieje Aktivny kod A/N  A/N';
      COMMENT ON COLUMN m.kody.vysledok_hod IS 'pozicia pre zapis hodin do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250 tabulka mvek';
      COMMENT ON COLUMN m.kody.vysledok_suma IS 'pozicia pre zapis sumy penazi do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250';
      COMMENT ON COLUMN m.kody.vysledok_dni IS 'pozicia pre zapis dni do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250';
      COMMENT ON COLUMN m.kody.vysledok_pocet IS 'pozicia pre zapis poctu pripadov do vektora (v tabulke mvy)  vid. Ciselnik pozicii 1-250';
      COMMENT ON COLUMN m.kody.vypocet_nemoc IS 'Ma sa volat vypocet nemoci ?  A/N';
      COMMENT ON COLUMN m.kody.nemoc1_sadzba IS 'percento pre nemoc 1 interval = nizsia sadzba  ';
      COMMENT ON COLUMN m.kody.nemoc1_dni IS 'pocet dni pre nemoc 1  ';
      COMMENT ON COLUMN m.kody.nemoc2_sadzba IS 'percento pre nemoc 2 interval = vyssia sadzba';
      COMMENT ON COLUMN m.kody.nemoc2_dni IS 'pocet dni pre nemoc 2  ';
      COMMENT ON COLUMN m.kody.skupina_zrazok IS 'skupina zrazok – 0 – 9  - priorita zrazok  ';
      COMMENT ON COLUMN m.kody.druh_vynatia IS 'druh vynatia pre statisticke ucely  ';
      COMMENT ON COLUMN m.kody.ukoncenie IS 'nulovat pri ukonceni (A/N) Ak nastalo ukoncenie pracovneho pomeru, tak kody poloziek, ktore maju toto pole nastavene na Ano sa nuluju pri vypocte.  A/N';      
      `)
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.kody CASCADE;`);
}

