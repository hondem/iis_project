import React from 'react';

import { Label, Input, Select, ErrorMessage } from '../../../shared/forms';
import { Grid, Flex, Box } from '../../../shared/layout';
import { SelectOption } from '../../../../types/common';
import { Heading, Paragraph } from '../../../shared/typography';

/* Form data
============================================================================= */
const EMPLOYMENT_OPTION: SelectOption[] = [
  {
    label: 'Hlavný',
    value: 'H',
  },
  {
    label: 'Vedlajší',
    value: 'V',
  },
  {
    label: 'Brigáda',
    value: 'B',
  },
];

const SALARY_CLASS_OPTION: SelectOption[] = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const LABOUR_TIME_OPTION: SelectOption[] = [
  {
    label: 'Mesačná',
    value: 'M',
  },
  {
    label: 'Hodinová',
    value: 'H',
  },
];

const CALENDAR_OPTION: SelectOption[] = [
  {
    label: '8 hod/den',
    value: '1',
  },
  {
    label: '7.5 hod/den',
    value: '2',
  },
];

const HOLIDAY_CALCULATION: SelectOption[] = [
  {
    label: 'Priemerom',
    value: 'P',
  },
  {
    label: 'Tarifom',
    value: 'T',
  },
];

const PENSION_OPTION: SelectOption[] = [
  {
    label: 'Starobný',
    value: 'S',
  },
  {
    label: 'Invalidný',
    value: 'I',
  },
];

/* Props - <WageInfo />
============================================================================= */
type Props = {
  formType: string | string[];
};

/* <WageInfo />
============================================================================= */
const WageInfo: React.FunctionComponent<Props> = ({ formType }) => {
  switch (formType) {
    case 'employment':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="platnost_od">Dátum platnosti zadaných údajov</Label>
            <Input name="platnost_od" disabled />
            <ErrorMessage name="platnost_od" />
          </div>

          <div>
            <Label htmlFor="druh">Druh pracovného pomeru</Label>
            <Select name="druh" options={EMPLOYMENT_OPTION} />
            <ErrorMessage name="druh" />
          </div>

          <div>
            <Label htmlFor="trieda">Platová trieda</Label>
            <Select name="trieda" options={SALARY_CLASS_OPTION} />
            <ErrorMessage name="trieda" />
          </div>

          <div>
            <Label htmlFor="pracovna_doba_typ">Typ pracovnej doby</Label>
            <Select name="pracovna_doba_typ" options={LABOUR_TIME_OPTION} />
            <ErrorMessage name="pracovna_doba_typ" />
          </div>

          <div>
            <Label htmlFor="tarif">Tarif</Label>
            <Input name="tarif" />
            <ErrorMessage name="tarif" />
          </div>

          <div>
            <Label htmlFor="kalendar_typ">Typ kalendáru</Label>
            <Select name="kalendar_typ" options={CALENDAR_OPTION} />
            <ErrorMessage name="kalendar_typ" />
          </div>

          <div>
            <Label htmlFor="uvazok">Úväzok %</Label>
            <Input name="uvazok" />
            <ErrorMessage name="uvazok" />
          </div>

          <div>
            <Label htmlFor="vypocet_sviatkov">Druh prepočtu sviatkov</Label>
            <Select name="vypocet_sviatkov" options={HOLIDAY_CALCULATION} />
            <ErrorMessage name="vypocet_sviatkov" />
          </div>

          <div>
            <Label htmlFor="pracovny_pomer_nad_5dni">Pracovný pomer nad 5 dní</Label>
            <Input name="pracovny_pomer_nad_5dni" type="checkbox" />
            <ErrorMessage name="pracovny_pomer_nad_5dni" />
          </div>

          <div>
            <Label htmlFor="pracovna_schopnost_znizena1">
              Znížená pracovná schopnosť 1. kategória
            </Label>
            <Input name="pracovna_schopnost_znizena1" type="checkbox" />
            <ErrorMessage name="pracovna_schopnost_znizena1" />
          </div>

          <div>
            <Label htmlFor="pracovna_schopnost_znizena2">
              Znížená pracovná schopnosť 2. kategória
            </Label>
            <Input name="pracovna_schopnost_znizena2" type="checkbox" />
            <ErrorMessage name="pracovna_schopnost_znizena2" />
          </div>

          <div>
            <Label htmlFor="pracovna_schopnost_znizena3">
              Znížená pracovná schopnosť 3. kategória
            </Label>
            <Input name="pracovna_schopnost_znizena3" type="checkbox" />
            <ErrorMessage name="pracovna_schopnost_znizena3" />
          </div>

          <div>
            <Label htmlFor="dochodca">Dôchodca</Label>
            <Input name="dochodca" type="checkbox" />
            <ErrorMessage name="dochodca" />
          </div>

          <div>
            <Label htmlFor="dochodok_typ">Typ dôchodku</Label>
            <Select name="dochodok_typ" options={PENSION_OPTION} />
            <ErrorMessage name="dochodok_typ" />
          </div>
        </Grid>
      );
    case 'tax':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="pocet_deti">Počet detí</Label>
            <Input name="pocet_deti" />
            <ErrorMessage name="pocet_deti" />
          </div>

          <div>
            <Label htmlFor="pocet_deti_do_6">Počet detí do 6 rokov</Label>
            <Input name="pocet_deti_do_6" />
            <ErrorMessage name="pocet_deti_do_6" />
          </div>

          <div>
            <Label htmlFor="danovy_odpocet_manzelka">Daňový odpočet za manželku</Label>
            <Input name="danovy_odpocet_manzelka" type="checkbox" />
            <ErrorMessage name="danovy_odpocet_manzelka" />
          </div>

          <div>
            <Label htmlFor="danovy_bonus">Daňový bonus</Label>
            <Input name="danovy_bonus" type="checkbox" />
            <ErrorMessage name="danovy_bonus" />
          </div>

          <div>
            <Label htmlFor="nezdanitelne_min">Nezdanitelné minimum</Label>
            <Input name="nezdanitelne_min" type="checkbox" />
            <ErrorMessage name="nezdanitelne_min" />
          </div>
        </Grid>
      );

    case 'statistics':
      return (
        <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
          <div>
            <Label htmlFor="pracovna_kategoria">Pracovná kategoria</Label>
            <Input name="pracovna_kategoria" />
            <ErrorMessage name="pracovna_kategoria" />
          </div>

          <div>
            <Label htmlFor="staticticky_udaj">Štatistický údaj</Label>
            <Input name="staticticky_udaj" />
            <ErrorMessage name="staticticky_udaj" />
          </div>

          <div>
            <Label htmlFor="specialna_kategoria">Špeciálna kategoria</Label>
            <Input name="specialna_kategoria" />
            <ErrorMessage name="specialna_kategoria" />
          </div>
        </Grid>
      );
    case 'insurance':
      return (
        <>
          <Box mb="s10">
            <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
              <div>
                <Label htmlFor="zdravotna_poistovna">Zdravotná poisťovňa</Label>
                <Input name="zdravotna_poistovna" />
                <ErrorMessage name="zdravotna_poistovna" />
              </div>
            </Grid>
          </Box>

          <Box mb="s10">
            <Heading as="h3">Zamestnanec</Heading>
            <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
              <div>
                <Label htmlFor="zc_zp">Zdravotné</Label>
                <Input name="zc_zp" type="checkbox" />
                <ErrorMessage name="zc_zp" />
              </div>

              <div>
                <Label htmlFor="zc_sp_dp">Dôchodkové a starobné</Label>
                <Input name="zc_sp_dp" type="checkbox" />
                <ErrorMessage name="zc_sp_dp" />
              </div>

              <div>
                <Label htmlFor="zc_sp_np">Nemocenské</Label>
                <Input name="zc_sp_np" type="checkbox" />
                <ErrorMessage name="zc_sp_np" />
              </div>

              <div>
                <Label htmlFor="zc_sp_pvn">V nezamestnanosti</Label>
                <Input name="zc_sp_pvn" type="checkbox" />
                <ErrorMessage name="zc_sp_pvn" />
              </div>
            </Grid>
          </Box>

          <Box>
          <Heading as="h3">Zamestnávateľ</Heading>
            <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gridGap="s6" mb="s6">
              <div>
                <Label htmlFor="zl_sp_dp">Dôchodkové a starobné</Label>
                <Input name="zl_sp_dp" type="checkbox" />
                <ErrorMessage name="zl_sp_dp" />
              </div>

              <div>
                <Label htmlFor="zl_sp_np">Nemocenské</Label>
                <Input name="zl_sp_np" type="checkbox" />
                <ErrorMessage name="zl_sp_np" />
              </div>

              <div>
                <Label htmlFor="zl_sp_pvn">V nezamestnanosti</Label>
                <Input name="zl_sp_pvn" type="checkbox" />
                <ErrorMessage name="zl_sp_pvn" />
              </div>

              <div>
                <Label htmlFor="zl_zp">Zdravotné</Label>
                <Input name="zl_zp" type="checkbox" />
                <ErrorMessage name="zl_zp" />
              </div>
            </Grid>
          </Box>
        </>
      );

    default:
      return (
        <Flex flexDirection="column" alignItems="center">
          <Heading textAlign="center" mb="s4">
            404
          </Heading>
          <Paragraph textAlign="center">Požadovaná stránka neexistuje.</Paragraph>
        </Flex>
      );
  }
};

export default WageInfo;
