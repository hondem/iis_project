import Koa from 'koa'

/**
 * Convert plain object to nested
 * @param ctx 
 */
const plainObjectToNested = (plain) => {
  return {
    id: (plain && plain.id) ? parseInt(plain.id) : undefined,
    spolecnost: (plain && plain.spolecnost) ? parseInt(plain.spolecnost) : undefined,
    osobni: {
      meno: (plain && plain.meno) ? plain.meno : undefined,
      stredne_meno: (plain && plain.stredne_meno) ? plain.stredne_meno : undefined,
      priezvisko: (plain && plain.priezvisko) ? plain.priezvisko : undefined,
      rodne_cislo: (plain && plain.rodne_cislo) ? plain.rodne_cislo : undefined,
      datum_nar: (plain && plain.datum_nar) ? plain.datum_nar : undefined,
      pohlavie: (plain && plain.pohlavie) ? plain.pohlavie : undefined,
      statna_prislusnost: (plain && plain.statna_prislusnost) ? plain.statna_prislusnost : undefined,
      miesto_narodenia: (plain && plain.miesto_narodenia) ? plain.miesto_narodenia : undefined,
      stav: (plain && plain.stav) ? plain.stav : undefined,
      obciansky: (plain && plain.obciansky) ? plain.obciansky : undefined,
      pas: (plain && plain.pas) ? plain.pas : undefined
    },
    firemni:{
      osobne_cislo: (plain && plain.osobne_cislo) ? plain.osobne_cislo : undefined,
      externe_osobne_cislo: (plain && plain.externe_osobne_cislo) ? plain.externe_osobne_cislo : undefined,
      aktivny: (plain && plain.aktivny) ? plain.aktivny : undefined,
      funkcia: (plain && plain.funkcia) ? plain.funkcia : undefined,
      pozicia: (plain && plain.pozicia) ? plain.pozicia : undefined,
      oddelenie: (plain && plain.oddelenie) ? plain.oddelenie : undefined,
      pobocka: (plain && plain.pobocka) ? plain.pobocka : undefined,
      stredisko: (plain && plain.stredisko) ? plain.stredisko : undefined,
      nastup: (plain && plain.nastup) ? plain.nastup : undefined,
      ukoncenie: (plain && plain.ukoncenie) ? plain.ukoncenie : undefined,
      pozn: (plain && plain.pozn) ? plain.pozn : undefined
    },
    adresa_trvale: {
      adresa_ulica_trvale: (plain && plain.adresa_ulica_trvale) ? plain.adresa_ulica_trvale : undefined,
      adresa_cislo_popisne_trvale: (plain && plain.adresa_cislo_popisne_trvale) ? plain.adresa_cislo_popisne_trvale : undefined,
      adresa_cislo_domu_trvale: (plain && plain.adresa_cislo_domu_trvale) ? plain.adresa_cislo_domu_trvale : undefined,
      psc_trvale: (plain && plain.psc_trvale) ? plain.psc_trvale : undefined,
      mesto_trvale: (plain && plain.mesto_trvale) ? plain.mesto_trvale : undefined,
      okres_trvale: (plain && plain.okres_trvale) ? plain.okres_trvale : undefined,
      kraj_trvale: (plain && plain.kraj_trvale) ? plain.kraj_trvale : undefined,
      krajina_trvale: (plain && plain.krajina_trvale) ? plain.krajina_trvale : undefined
    },
    adresa_prechodne: {
      adresa_ulica_prechodne: (plain && plain.adresa_ulica_prechodne) ? plain.adresa_ulica_prechodne : undefined,
      adresa_cislo_popisne_prechodne: (plain && plain.adresa_cislo_popisne_prechodne) ? plain.adresa_cislo_popisne_prechodne : undefined,
      adresa_cislo_domu_prechodne: (plain && plain.adresa_cislo_domu_prechodne) ? plain.adresa_cislo_domu_prechodne : undefined,
      psc_prechodne: (plain && plain.psc_prechodne) ? plain.psc_prechodne : undefined,
      mesto_prechodne: (plain && plain.mesto_prechodne) ? plain.mesto_prechodne : undefined,
      okres_prechodne: (plain && plain.okres_prechodne) ? plain.okres_prechodne : undefined,
      kraj_prechodne: (plain && plain.kraj_prechodne) ? plain.kraj_prechodne : undefined,
      krajina_prechodne: (plain && plain.krajina_prechodne) ? plain.krajina_prechodne : undefined
    },
    kontakt: {
      telefon_pracovny: (plain && plain.telefon_pracovny) ? plain.telefon_pracovny : undefined,
      telefon_sukromny: (plain && plain.telefon_sukromny) ? plain.telefon_sukromny : undefined,
      telefon_iny: (plain && plain.telefon_iny) ? plain.telefon_iny : undefined,
      skype: (plain && plain.skype) ? plain.skype : undefined,
      email: (plain && plain.email) ? plain.email : undefined
    }
  }
}

/**
 * Convert nested object to plain
 * @param nested 
 */
const nestedObjectToPlain = (nested) => {
  return {
    spolecnost: (nested && nested.spolecnost) ? parseInt(nested.spolecnost) : undefined,
    
    meno: (nested && nested.osobni && nested.osobni.meno) ? nested.osobni.meno : undefined,
    stredne_meno: (nested && nested.osobni && nested.osobni.stredne_meno) ? nested.osobni.stredne_meno : undefined,
    priezvisko: (nested && nested.osobni && nested.osobni.priezvisko) ? nested.osobni.priezvisko : undefined,
    rodne_cislo: (nested && nested.osobni && nested.osobni.rodne_cislo) ? nested.osobni.rodne_cislo : undefined,
    datum_nar: (nested && nested.osobni && nested.osobni.datum_nar) ? nested.osobni.datum_nar : undefined,
    pohlavie: (nested && nested.osobni && nested.osobni.pohlavie) ? nested.osobni.pohlavie : undefined,
    statna_prislusnost: (nested && nested.osobni && nested.osobni.statna_prislusnost) ? nested.osobni.statna_prislusnost : undefined,
    miesto_narodenia: (nested && nested.osobni && nested.osobni.miesto_narodenia) ? nested.osobni.miesto_narodenia : undefined,
    stav: (nested && nested.osobni && nested.osobni.stav) ? nested.osobni.stav : undefined,
    obciansky: (nested && nested.osobni && nested.osobni.obciansky) ? nested.osobni.obciansky : undefined,
    pas: (nested && nested.osobni && nested.osobni.pas) ? nested.osobni.pas : undefined,

    osobne_cislo: (nested && nested.firemni && nested.firemni.osobne_cislo) ? nested.firemni.osobne_cislo : undefined,
    externe_osobne_cislo: (nested && nested.firemni && nested.firemni.externe_osobne_cislo) ? nested.firemni.externe_osobne_cislo : undefined,
    aktivny: (nested && nested.firemni && nested.firemni.aktivny) ? nested.firemni.aktivny : undefined,
    funkcia: (nested && nested.firemni && nested.firemni.funkcia) ? nested.firemni.funkcia : undefined,
    pozicia: (nested && nested.firemni && nested.firemni.pozicia) ? nested.firemni.pozicia : undefined,
    oddelenie: (nested && nested.firemni && nested.firemni.oddelenie) ? nested.firemni.oddelenie : undefined,
    pobocka: (nested && nested.firemni && nested.firemni.pobocka) ? nested.firemni.pobocka : undefined,
    stredisko: (nested && nested.firemni && nested.firemni.stredisko) ? nested.firemni.stredisko : undefined,
    nastup: (nested && nested.firemni && nested.firemni.nastup) ? nested.firemni.nastup : undefined,
    ukoncenie: (nested && nested.firemni && nested.firemni.ukoncenie) ? nested.firemni.ukoncenie : undefined,
    pozn: (nested && nested.firemni && nested.firemni.pozn) ? nested.firemni.pozn : undefined,

    adresa_ulica_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.adresa_ulica_trvale) ? nested.adresa_trvale.adresa_ulica_trvale : undefined,
    adresa_cislo_popisne_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.adresa_cislo_popisne_trvale) ? nested.adresa_trvale.adresa_cislo_popisne_trvale : undefined,
    adresa_cislo_domu_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.adresa_cislo_domu_trvale) ? nested.adresa_trvale.adresa_cislo_domu_trvale : undefined,
    psc_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.psc_trvale) ? nested.adresa_trvale.psc_trvale : undefined,
    mesto_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.mesto_trvale) ? nested.adresa_trvale.mesto_trvale : undefined,
    okres_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.okres_trvale) ? nested.adresa_trvale.okres_trvale : undefined,
    kraj_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.kraj_trvale) ? nested.adresa_trvale.kraj_trvale : undefined,
    krajina_trvale: (nested && nested.adresa_trvale && nested.adresa_trvale.krajina_trvale) ? nested.adresa_trvale.krajina_trvale : undefined,

    adresa_ulica_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.adresa_ulica_prechodne) ? nested.adresa_prechodne.adresa_ulica_prechodne : undefined,
    adresa_cislo_popisne_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.adresa_cislo_popisne_prechodne) ? nested.adresa_prechodne.adresa_cislo_popisne_prechodne : undefined,
    adresa_cislo_domu_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.adresa_cislo_domu_prechodne) ? nested.adresa_prechodne.adresa_cislo_domu_prechodne : undefined,
    psc_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.psc_prechodne) ? nested.adresa_prechodne.psc_prechodne : undefined,
    mesto_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.mesto_prechodne) ? nested.adresa_prechodne.mesto_prechodne : undefined,
    okres_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.okres_prechodne) ? nested.adresa_prechodne.okres_prechodne : undefined,
    kraj_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.kraj_prechodne) ? nested.adresa_prechodne.kraj_prechodne : undefined,
    krajina_prechodne: (nested && nested.adresa_prechodne && nested.adresa_prechodne.krajina_prechodne) ? nested.adresa_prechodne.krajina_prechodne : undefined,

    telefon_pracovny: (nested && nested.kontakt && nested.kontakt.telefon_pracovny) ? nested.kontakt.telefon_pracovny : undefined,
    telefon_sukromny: (nested && nested.kontakt && nested.kontakt.telefon_sukromny) ? nested.kontakt.telefon_sukromny : undefined,
    telefon_iny: (nested && nested.kontakt && nested.kontakt.telefon_iny) ? nested.kontakt.telefon_iny : undefined,
    skype: (nested && nested.kontakt && nested.kontakt.skype) ? nested.kontakt.skype : undefined,
    email: (nested && nested.kontakt && nested.kontakt.email) ? nested.kontakt.email : undefined
  }
}

export default {
  plainObjectToNested,
  nestedObjectToPlain
}