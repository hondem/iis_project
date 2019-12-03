import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.raw(`
  CREATE TABLE m.parametre (
    id integer NOT NULL PRIMARY KEY,
    datum date NOT NULL,
    ico varchar (10) NOT NULL,
    nazov varchar (50) NOT NULL,
    dic varchar (15) NOT NULL,
    ic_dph varchar (15) NOT NULL,
    addr1 varchar (50) NOT NULL,
    addr2 varchar (50) NOT NULL,
    addr3 varchar (50) NOT NULL,
    addr4 varchar (50) NOT NULL,
    addr5 varchar (50) NOT NULL,
    psc char (6) NOT NULL,
    kod_banky char (12) NOT NULL,
    bankovy_ucet char (24) NOT NULL,
    zc_sadzba_zp float NOT NULL,
    zc_sadzba_np float NOT NULL,
    zc_sadzba_sp_d float NOT NULL,
    zc_sadzba_sp_i float NOT NULL,
    zc_sadzba_pvn float NOT NULL,
    zl_sadzba_zp float NOT NULL,
    zl_sadzba_np float NOT NULL,
    zl_sadzba_sp_d float NOT NULL,
    zl_sadzba_sp_i float NOT NULL,
    zl_sadzba_pvn float NOT NULL,
    zl_sadzba_garancny_fond float NOT NULL,
    zl_sadzba_up float NOT NULL,
    zl_sadzba_rezervny_fond float NOT NULL,
    zl_sadzba_socialny_fond float NOT NULL,
    mzda_min_hod1 float NOT NULL,
    mzda_min_hod2 float NOT NULL,
    mzda_min_hod3 float NOT NULL,
    mzda_min_hod4 float NOT NULL,
    mzda_min_hod5 float NOT NULL,
    mzda_min_hod6 float NOT NULL,
    mzda_min_mes1 float NOT NULL,
    mzda_min_mes2 float NOT NULL,
    mzda_min_mes3 float NOT NULL,
    mzda_min_mes4 float NOT NULL,
    mzda_min_mes5 float NOT NULL,
    mzda_min_mes6 float NOT NULL,
    vymeriavaci_zaklad_max_sp float NOT NULL,
    zivotne_min float NOT NULL,
    zivotne_min_dalsia float NOT NULL,
    zivotne_min_dieta float NOT NULL,
    dan_sadzba_zaklad float NOT NULL,
    dan_sadzba_zvysena float NOT NULL,
    dan_sadzba_dividend float NOT NULL,
    dan_sadzba_rezident float NOT NULL,
    dan_sadzba_nerezident float NOT NULL,
    dan_ustavny_cinitel float NOT NULL,
    nezdanitelna_ciastka_zakladu_dane_roc float NOT NULL,
    nezdanitelna_ciastka_zakladu_dane_mes float NOT NULL,
    rszpdb float NOT NULL,
    danovy_bonus_mes float NOT NULL,
    danovy_bonus_roc float NOT NULL,
    hranica_zdanitelneho_prijmu_dp float NOT NULL,
    mzda_min_danovy_bonus_mes float NOT NULL,
    odvodova_vynimka_stud float NOT NULL,
    odvodova_vynimka_dochodca float NOT NULL,
    odpocitatelna_polozka_zdravotne_poistenie_mes float NOT NULL,
    vymeriavaci_zaklad_nemocenske_davky_max_den float NOT NULL,
    nahrada_km float NOT NULL,
    stravne_min float NOT NULL,
    stravne_zakladne float NOT NULL,
    stravne_5 float NOT NULL,
    stravne_12 float NOT NULL,
    stravne_18 float NOT NULL,
    plat13_obdobie1 float NOT NULL,
    plat13_obdobie2 float NOT NULL,
    plat13_obdobie3 float NOT NULL,
    nasobok_zivotneho_minima_pre_dan float NOT NULL
  );
  COMMENT ON TABLE m.parametre IS 'Parametre pre nastavenie miezd (globalne) :: tabulka obsahuje globalne parametre (vyplivaju z legistalivy),
   pouzivane pre vypocet miezd. jednotlive zaznamy predstavuju platne hodnoty pre casove obdobie dane datumom.';
  COMMENT ON COLUMN m.parametre.id IS ' - poradove cislo zaznamu';
  COMMENT ON COLUMN m.parametre.datum IS ' - datum platnosti od kedy platia hodnoty v zazname';
  COMMENT ON COLUMN m.parametre.ico IS ' - ICO firmy z registra firiem (www.orsr.sk)';
  COMMENT ON COLUMN m.parametre.nazov IS ' - nazov firmy z registra firiem (www.orsr.sk)';
  COMMENT ON COLUMN m.parametre.dic IS ' - DIC firmy';
  COMMENT ON COLUMN m.parametre.ic_dph IS ' - IC DPH firmy ';
  COMMENT ON COLUMN m.parametre.addr1 IS '..5 - riadky adresy firmy';
  COMMENT ON COLUMN m.parametre.psc IS ' - psc';
  COMMENT ON COLUMN m.parametre.kod_banky IS ' - kod banky (vyber z ciselnika bank cba) napr. 0200 - Vseobecna Uverova Banka, a.s.';
  COMMENT ON COLUMN m.parametre.bankovy_ucet IS ' - IBAN ucet firmy, z ktoreho sa platia vyplaty';
  COMMENT ON COLUMN m.parametre.zc_sadzba_zp IS ' - sadzba v percentach pre zdravotne poistenie zamestnanca';
  COMMENT ON COLUMN m.parametre.zc_sadzba_np IS '  - sadzba v percentach pre nemocenske poistenie zamestnanca';
  COMMENT ON COLUMN m.parametre.zc_sadzba_sp_d IS ' - sadzba v percentach pre dochodkove poistenie starobne zamestnanca';
  COMMENT ON COLUMN m.parametre.zc_sadzba_sp_i IS ' - sadzba v percentach pre dochodkove poistenie invalidne zamestnanca';
  COMMENT ON COLUMN m.parametre.zc_sadzba_pvn IS ' - sadzba v percentach pre poistenie v nezamestnanosti zamestnanca';
  COMMENT ON COLUMN m.parametre.zl_sadzba_zp IS '  - sadzba v percentach pre zdravotne poistenie zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_np IS '  - sadzba v percentach pre nemocenske poistenie zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_sp_d IS ' - sadzba v percentach pre dochodkove poistenie starobne zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_sp_i IS ' - sadzba v percentach pre dochodkove poistenie invalidne zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_pvn IS ' - sadzba v percentach pre poistenie v nezamestnanosti zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_garancny_fond IS '  - sadzba v percentach pre TODO: fond? garancne poistenie zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_up IS '  - sadzba v percentach pre urazove poistenie zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_rezervny_fond IS '  - sadzba v percentach pre rezervny fond zamestnavatel';
  COMMENT ON COLUMN m.parametre.zl_sadzba_socialny_fond IS '  - sadzba v percentach pre socialny fond zamestnavatel';
  COMMENT ON COLUMN m.parametre.mzda_min_hod1 IS ' - minimalna mzda hodinova pre kategoriu 1 ';
  COMMENT ON COLUMN m.parametre.mzda_min_hod2 IS ' - minimalna mzda hodinova pre kategoriu 2';
  COMMENT ON COLUMN m.parametre.mzda_min_hod3 IS ' - minimalna mzda hodinova pre kategoriu 3';
  COMMENT ON COLUMN m.parametre.mzda_min_hod4 IS ' - minimalna mzda hodinova pre kategoriu 4';
  COMMENT ON COLUMN m.parametre.mzda_min_hod5 IS ' - minimalna mzda hodinova pre kategoriu 5';
  COMMENT ON COLUMN m.parametre.mzda_min_hod6 IS ' - minimalna mzda hodinova pre kategoriu 6';
  COMMENT ON COLUMN m.parametre.mzda_min_mes1 IS ' - minimalna mzda mesacnaa pre kategoriu 1';
  COMMENT ON COLUMN m.parametre.mzda_min_mes2 IS ' - minimalna mzda mesacnaa pre kategoriu 2';
  COMMENT ON COLUMN m.parametre.mzda_min_mes3 IS ' - minimalna mzda mesacnaa pre kategoriu 3';
  COMMENT ON COLUMN m.parametre.mzda_min_mes4 IS ' - minimalna mzda mesacnaa pre kategoriu 4';
  COMMENT ON COLUMN m.parametre.mzda_min_mes5 IS ' - minimalna mzda mesacnaa pre kategoriu 5';
  COMMENT ON COLUMN m.parametre.mzda_min_mes6 IS ' - minimalna mzda mesacnaa pre kategoriu 6';
  COMMENT ON COLUMN m.parametre.vymeriavaci_zaklad_max_sp IS ' - maximalny vymeriavaci zaklad pre socialnu poistovnu';
  COMMENT ON COLUMN m.parametre.zivotne_min IS ' -   mesacne zivotne minimum ak ide o jednu plnoletú fyzickú osobu,';
  COMMENT ON COLUMN m.parametre.zivotne_min_dalsia IS ' -  mesačne, ak ide o ďalšiu spoločne posudzovanú plnoletú fyzickú osobu,';
  COMMENT ON COLUMN m.parametre.zivotne_min_dieta IS ' -  mesačne, ak ide o nezaopatrené dieťa alebo zaopatrené neplnoleté dieťa.';
  COMMENT ON COLUMN m.parametre.dan_sadzba_zaklad IS ' - zakladna sadzba dane pre vypocet mzdy';
  COMMENT ON COLUMN m.parametre.dan_sadzba_zvysena IS ' - zvysena sadzba dane pre vypocet mzdy';
  COMMENT ON COLUMN m.parametre.dan_sadzba_dividend IS ' - sadzba dane z vyplatenych dividend';
  COMMENT ON COLUMN m.parametre.dan_sadzba_rezident IS ' - sadzba dane pre pre rezidenta';
  COMMENT ON COLUMN m.parametre.dan_sadzba_nerezident IS ' - sadzba dane pre nerezidenta';
  COMMENT ON COLUMN m.parametre.dan_ustavny_cinitel IS ' - sadzba dane pre ustavnych cinitelov';
  COMMENT ON COLUMN m.parametre.nezdanitelna_ciastka_zakladu_dane_roc IS ' - nezdanitelna ciastka zakladu dane rocna';
  COMMENT ON COLUMN m.parametre.nezdanitelna_ciastka_zakladu_dane_mes IS ' - nezdanitelna ciastka zakladu dane mesacna';
  COMMENT ON COLUMN m.parametre.rszpdb IS ' -- nikto nevie:: TODO:';
  COMMENT ON COLUMN m.parametre.danovy_bonus_mes IS ' - mesacna sadzba danovy bonus na dieta';
  COMMENT ON COLUMN m.parametre.danovy_bonus_roc IS ' - rocna sadzba danovy bonus na dieta';
  COMMENT ON COLUMN m.parametre.hranica_zdanitelneho_prijmu_dp IS ' Hranica zdanitelneho prijmu pre dan.bonus prijem min. 6xmin.mzda';
  COMMENT ON COLUMN m.parametre.mzda_min_danovy_bonus_mes IS ' - minimalna mesacna mzda pre danovy bonus';
  COMMENT ON COLUMN m.parametre.odvodova_vynimka_stud IS ' - Suma pre odvodova vynimka student';
  COMMENT ON COLUMN m.parametre.odvodova_vynimka_dochodca IS ' Suma pre odvodova vynimka dochodca';
  COMMENT ON COLUMN m.parametre.odpocitatelna_polozka_zdravotne_poistenie_mes IS ' - mesacna odpocitatelna polozka zdravotne poistenie';
  COMMENT ON COLUMN m.parametre.vymeriavaci_zaklad_nemocenske_davky_max_den IS ' - maximalny denny vymeriavaci zaklad pre nemocenske davky';
  COMMENT ON COLUMN m.parametre.nahrada_km IS ' - nahrada za kilometer jazdy sluz.cesta dvojstopove vozidlo';
  COMMENT ON COLUMN m.parametre.stravne_min IS ' - minimalne stravne';
  COMMENT ON COLUMN m.parametre.stravne_zakladne IS ' - nahrada stravne za 4 hod odprac.smenu';
  COMMENT ON COLUMN m.parametre.stravne_5 IS ' - Stravne 5-12 h';
  COMMENT ON COLUMN m.parametre.stravne_12 IS ' - Stravne 12-18 h';
  COMMENT ON COLUMN m.parametre.stravne_18 IS ' - stravne nad 18 h';
  COMMENT ON COLUMN m.parametre.plat13_obdobie1 IS ' - 13 plat rok1';
  COMMENT ON COLUMN m.parametre.plat13_obdobie2 IS ' - 13 plat rok2';
  COMMENT ON COLUMN m.parametre.plat13_obdobie3 IS ' - 13 plat rok3';
  COMMENT ON COLUMN m.parametre.nasobok_zivotneho_minima_pre_dan IS ' - nasobok zivotneho minima pre rozdelenie zakladu dane pre vypocet nizzsim percentom a vyssim percentom';
        `)

}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE m.parametre;`);
}

