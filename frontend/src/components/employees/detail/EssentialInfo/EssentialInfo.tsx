import React from 'react';

import { Label, Input, Select, ErrorMessage } from '../../../shared/forms';
import { Grid, Flex } from '../../../shared/layout';
import { SelectOption } from '../../../../types/common';
import { Heading, Paragraph } from '../../../shared/typography';
import { Box } from 'react-feather';

/* Form data
============================================================================= */
const SEX_OPTION: SelectOption[] = [
  {
    label: 'Žena',
    value: 'F',
  },
  {
    label: 'Muž',
    value: 'M',
  },
];

const RELATION_OPTION: SelectOption[] = [
  {
    label: 'Vydatá/Ženatý',
    value: 'Z',
  },
  {
    label: 'Slobodn(á)/ý',
    value: 'S',
  },
];

/* Props - <EssentialInfo />
============================================================================= */
type Props = {
  formType: string | string[];
};

/* <EssentialInfo />
============================================================================= */
const EssentialInfo: React.FunctionComponent<Props> = ({ formType }) => {
  switch (formType) {
    /* Personal */
    case 'personal':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="osobni.meno">Meno</Label>
            <Input name="osobni.meno" />
            <ErrorMessage name="osobni.meno" />
          </div>

          <div>
            <Label htmlFor="osobni.priezvisko">Priezvisko</Label>
            <Input name="osobni.priezvisko" />
            <ErrorMessage name="osobni.priezvisko" />
          </div>

          <div>
            <Label htmlFor="osobni.stredne_meno">Stredné meno</Label>
            <Input name="osobni.stredne_meno" />
            <ErrorMessage name="osobni.stredne_meno" />
          </div>

          <div>
            <Label htmlFor="osobni.pohlavie">Pohlavie</Label>
            <Select name="osobni.pohlavie" options={SEX_OPTION} />
            <ErrorMessage name="osobni.pohlavie" />
          </div>

          <div>
            <Label htmlFor="osobni.datum_nar">Dátum narodenia</Label>
            <Input type="data" name="osobni.datum_nar" />
            <ErrorMessage name="osobni.datum_nar" />
          </div>

          <div>
            <Label htmlFor="osobni.rodne_cislo">Rodné číslo</Label>
            <Input name="osobni.rodne_cislo" />
            <ErrorMessage name="osobni.rodne_cislo" />
          </div>

          <div>
            <Label htmlFor="osobni.miesto_narodenia">Miesto narodenia</Label>
            <Input name="osobni.miesto_narodenia" />
            <ErrorMessage name="osobni.miesto_narodenia" />
          </div>

          <div>
            <Label htmlFor="osobni.statna_prislusnost">Štátna príslušnosť</Label>
            <Input name="osobni.statna_prislusnost" />
            <ErrorMessage name="osobni.statna_prislusnost" />
          </div>

          <div>
            <Label htmlFor="osobni.pas">Pas</Label>
            <Input name="osobni.pas" />
            <ErrorMessage name="osobni.pas" />
          </div>

          <div>
            <Label htmlFor="osobni.stav">Stav</Label>
            <Select name="osobni.stav" options={RELATION_OPTION} />
            <ErrorMessage name="osobni.stav" />
          </div>

          <div>
            <Label htmlFor="osobni.obciansky">Občiansky preukaz</Label>
            <Input name="osobni.obciansky" />
            <ErrorMessage name="osobni.obciansky" />
          </div>
        </Grid>
      );

    /* Company */
    case 'company':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="firemni.osobne_cislo">Obsobné číslo</Label>
            <Input name="firemni.osobne_cislo" />
            <ErrorMessage name="firemni.osobne_cislo" />
          </div>

          <div>
            <Label htmlFor="firemni.nastup">Nástup</Label>
            <Input name="firemni.nastup" />
            <ErrorMessage name="firemni.nastup" />
          </div>

          <div>
            <Label htmlFor="firemni.ukoncenie">Ukončenie</Label>
            <Input name="firemni.ukoncenie" />
            <ErrorMessage name="firemni.ukoncenie" />
          </div>

          <div>
            <Label htmlFor="firemni.aktivny">Aktívny</Label>
            <Input type="checkbox" name="firemni.aktivny" />
            <ErrorMessage name="firemni.aktivny" />
          </div>

          <div>
            <Label htmlFor="firemni.externe_osobne_cislo">Externé číslo</Label>
            <Input name="firemni.externe_osobne_cislo" />
            <ErrorMessage name="firemni.externe_osobne_cislo" />
          </div>

          <div>
            <Label htmlFor="firemni.funkcia">Funkcia</Label>
            <Input name="firemni.funkcia" />
            <ErrorMessage name="firemni.funkcia" />
          </div>

          <div>
            <Label htmlFor="firemni.pozicia">Pozícia</Label>
            <Input name="firemni.pozicia" />
            <ErrorMessage name="firemni.pozicia" />
          </div>

          <div>
            <Label htmlFor="firemni.oddelenie">Oddelenie</Label>
            <Input name="firemni.oddelenie" />
            <ErrorMessage name="firemni.oddelenie" />
          </div>

          <div>
            <Label htmlFor="firemni.pobocka">Pobočka</Label>
            <Input name="firemni.pobocka" />
            <ErrorMessage name="firemni.pobocka" />
          </div>

          <div>
            <Label htmlFor="firemni.stredisko">Stredisko</Label>
            <Input name="firemni.stredisko" />
            <ErrorMessage name="firemni.stredisko" />
          </div>

          <div>
            <Label htmlFor="firemni.pozn">Poznámka</Label>
            <Input name="firemni.pozn" />
            <ErrorMessage name="firemni.pozn" />
          </div>
        </Grid>
      );

    case 'permanent_address':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="adresa_trvale.adresa_ulica_trvale">Ulica</Label>
            <Input name="adresa_trvale.adresa_ulica_trvale" />
            <ErrorMessage name="adresa_trvale.adresa_ulica_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.adresa_cislo_popisne_trvale">Popisné číslo</Label>
            <Input name="adresa_trvale.adresa_cislo_popisne_trvale" />
            <ErrorMessage name="adresa_trvale.adresa_cislo_popisne_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.adresa_cislo_domu_trvale">Číslo domu</Label>
            <Input name="adresa_trvale.adresa_cislo_domu_trvale" />
            <ErrorMessage name="adresa_trvale.adresa_cislo_domu_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.psc_trvale">PSČ</Label>
            <Input name="adresa_trvale.psc_trvale" />
            <ErrorMessage name="adresa_trvale.psc_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.mesto_trvale">Mesto</Label>
            <Input name="adresa_trvale.mesto_trvale" />
            <ErrorMessage name="adresa_trvale.mesto_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.okres_trvale">Okres</Label>
            <Input name="adresa_trvale.okres_trvale" />
            <ErrorMessage name="adresa_trvale.okres_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.kraj_trvale">Kraj</Label>
            <Input name="adresa_trvale.kraj_trvale" />
            <ErrorMessage name="adresa_trvale.kraj_trvale" />
          </div>

          <div>
            <Label htmlFor="adresa_trvale.krajina_trvale">Krajina</Label>
            <Input name="adresa_trvale.krajina_trvale" />
            <ErrorMessage name="adresa_trvale.krajina_trvale" />
          </div>
        </Grid>
      );
    case 'subsidiary_address':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="adresa_prechodne.adresa_ulica_prechodne">Ulica</Label>
            <Input name="adresa_prechodne.adresa_ulica_prechodne" />
            <ErrorMessage name="adresa_prechodne.adresa_ulica_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.adresa_cislo_popisne_prechodne">Popisné číslo</Label>
            <Input name="adresa_prechodne.adresa_cislo_popisne_prechodne" />
            <ErrorMessage name="adresa_prechodne.adresa_cislo_popisne_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.adresa_cislo_domu_prechodne">Číslo domu</Label>
            <Input name="adresa_prechodne.adresa_cislo_domu_prechodne" />
            <ErrorMessage name="adresa_prechodne.adresa_cislo_domu_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.psc_prechodne">PSČ</Label>
            <Input name="adresa_prechodne.psc_prechodne" />
            <ErrorMessage name="adresa_prechodne.psc_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.mesto_prechodne">Mesto</Label>
            <Input name="adresa_prechodne.mesto_prechodne" />
            <ErrorMessage name="adresa_prechodne.mesto_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.okres_prechodne">Okres</Label>
            <Input name="adresa_prechodne.okres_prechodne" />
            <ErrorMessage name="adresa_prechodne.okres_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.kraj_prechodne">Kraj</Label>
            <Input name="adresa_prechodne.kraj_prechodne" />
            <ErrorMessage name="adresa_prechodne.kraj_prechodne" />
          </div>

          <div>
            <Label htmlFor="adresa_prechodne.krajina_prechodne">Krajina</Label>
            <Input name="adresa_prechodne.krajina_prechodne" />
            <ErrorMessage name="adresa_prechodne.krajina_prechodne" />
          </div>
        </Grid>
      );

    case 'contact':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="kontakt.telefon_pracovny">Pracovný telefón</Label>
            <Input name="kontakt.telefon_pracovny" />
            <ErrorMessage name="kontakt.telefon_pracovny" />
          </div>

          <div>
            <Label htmlFor="kontakt.telefon_sukromny">Súkromný telefón</Label>
            <Input name="kontakt.telefon_sukromny" />
            <ErrorMessage name="kontakt.telefon_sukromny" />
          </div>

          <div>
            <Label htmlFor="kontakt.telefon_iny">Iný telefón</Label>
            <Input name="kontakt.telefon_iny" />
            <ErrorMessage name="kontakt.telefon_iny" />
          </div>

          <div>
            <Label htmlFor="kontakt.email">Email</Label>
            <Input name="kontakt.email" />
            <ErrorMessage name="kontakt.email" />
          </div>

          <div>
            <Label htmlFor="kontakt.skype">Skype</Label>
            <Input name="kontakt.skype" />
            <ErrorMessage name="kontakt.skype" />
          </div>
        </Grid>
      );

      default: return (
        <Flex flexDirection="column" alignItems="center">
          <Heading textAlign="center" mb="s4">404</Heading>
          <Paragraph textAlign="center">Požadovaná stránka neexistuje.</Paragraph>
        </Flex>
      );
  }
};

export default EssentialInfo;
