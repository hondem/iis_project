import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import Router from 'next/router';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';

import { checkAuthorization } from '../../../../src/next';
import {
  Header,
  Content,
  PageHeader,
  Panel,
  Grid,
  Flex,
} from '../../../../src/components/shared/layout';
import { saveUserAction } from '../../../../src/actions/auth';
import { AppState } from '../../../../src/reducers';
import { Button, Alert } from '../../../../src/components/shared/misc';
import { SideMenu, EssentialInfo } from '../../../../src/components/employees';
import { deleteEmployee, updateEmployee } from '../../../../src/api/client/companies';
import { selectUser } from '../../../../src/selectors/auth';
import { getEmployee } from '../../../../src/api/client/companies';
import { AlertMessage } from '../../../../src/types/common';
import { THEME } from '../../../../src/theme';
import { canManageWageData } from '../../../../src/api/shared/auth';

/* Constants
============================================================================= */
const ValidationSchema = Yup.object().shape({
  osobni: Yup.object().shape({
    meno: Yup.string().required('Meno je povinné.'),
    priezvisko: Yup.string().required('Priezvisko je povinné.'),
    rodne_cislo: Yup.number().positive().required('Rodné číslo je povinné.'),
    datum_nar: Yup.date().required('Dátum narodenia je povinný.'),
    statna_prislusnost: Yup.string().required('Štátna príslušnosť je povinná.'),
    obciansky: Yup.string().required('Občiansky preukaz je povinný.'),
    miesto_narodenia: Yup.string().required('Miesto narodenia je povinné.'),
  }),
  firemni: Yup.object().shape({
    osobne_cislo: Yup.string().required('Obsobné číslo je povinné.'),
    nastup: Yup.date().required('Dátum nástupu je povinný.'),
    ukoncenie: Yup.date().required('Dátum ukončenia je povinný.'),
    funkcia: Yup.string().required('Políčko je povinné'),
    pozicia: Yup.string().required('Políčko je povinné'),
    oddelenie: Yup.string().required('Políčko je povinné'),
    pobocka: Yup.string().required('Políčko je povinné'),
    stredisko: Yup.string().required('Políčko je povinné'),
  }),
  adresa_trvale: Yup.object().shape({
    adresa_ulica_trvale: Yup.string().required('Políčko je povinné'),
    adresa_cislo_popisne_trvale: Yup.number().positive().required('Políčko je povinné'),
    adresa_cislo_domu_trvale: Yup.number().positive().required('Políčko je povinné'),
    psc_trvale: Yup.number().positive().required('Políčko je povinné'),
    mesto_trvale: Yup.string().required('Políčko je povinné'),
    okres_trvale: Yup.string().required('Políčko je povinné'),
    kraj_trvale: Yup.string().required('Políčko je povinné'),
    krajina_trvale: Yup.string().required('Políčko je povinné'),
  }),
  kontakt: Yup.object().shape({
    telefon_pracovny: Yup.string().required('Políčko je povinné'),
  }),
});

/* Props - <EssentialInfoPage />
============================================================================= */
type Props = {
  employeeId: number;
  formType: string | string[];
};

/* <EssentialInfoPage />
============================================================================= */
const EssentialInfoPage: NextPage<Props> = ({ employeeId, formType }) => {
  const [employee, setEmployee] = useState<any>(null);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchEmployee();
  }, []);

  /** Fetches employee data  */
  const fetchEmployee = async () => {
    await getEmployee(user.companyId, employeeId).then(({ data }) => {
      setEmployee(data);
    });
  };

  /**
   * Handles delete button click event.
   */
  const handleDelete = async () => {
    if (employee !== null) {
      let confirmation = confirm(
        `Určite chcete odstrániť zamestnanca "${employee.osobni.meno} ${employee.osobni.priezvisko}"?`,
      );

      if (confirmation) {
        setIsDeleteInProgress(true);

        await deleteEmployee(user.companyId, employee.id)
          .then(() => {
            /* Show success message */
            setAlertMessage({ type: 'success', message: 'Zamestnanec úspešne odstránený.' });

            setIsDeleteInProgress(false);

            setTimeout(() => {
              Router.push('/');
            }, 4000);
          })
          .catch(() => {
            /* Show success message */
            setAlertMessage({ type: 'success', message: 'Zamestnaneca sa nepodarilo odstrániť.' });

            setIsDeleteInProgress(false);
          });
      }
    }
  };

  /**
   * Handles save button click event.
   */
  const handleSubmit = async values => {
    const employeeOut = {
      ...values.osobni,
      ...values.firemni,
      ...values.adresa_trvale,
      ...values.adresa_prechodne,
      ...values.kontakt,
    };

    await updateEmployee(user.companyId, employee.id, employeeOut)
      .then(({ data }) => {
        setEmployee(data);

        /* Show success message */
        setAlertMessage({ type: 'success', message: 'Dáta boli úspešne aktualizované.' });
      })
      .catch(() => {
        /* Show error message */
        setAlertMessage({ type: 'error', message: 'Dáta sa nepodarilo aktualizovať.' });
      });
  };

  /**
   * Gets readable panel title from formType query.
   */
  const resolveFormTypeTitle = () => {
    switch (formType) {
      case 'personal': {
        return 'Osobné informácie';
      }
      case 'company': {
        return 'Firemné informácie';
      }
      case 'permanent_address': {
        return 'Trvalá adresa';
      }
      case 'subsidiary_address': {
        return 'Prechodná adresa';
      }
      case 'contact': {
        return 'Kontakt';
      }
    }
  };

  return (
    <>
      <Header />

      <Content isNarrow>
        {employee !== null ? (
          <>
            <Head>
              <title>
                {employee.osobni.meno} {employee.osobni.priezvisko} - Payday
              </title>
            </Head>

            <Formik
              initialValues={employee}
              onSubmit={handleSubmit}
              validationSchema={ValidationSchema}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <PageHeader
                    icon={<Users />}
                    title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
                    subtitle="Základné údaje"
                  >
                    {canManageWageData(user) && (
                      <Button
                        type="button"
                        onClick={() => {
                          Router.push(
                            '/employees/[id]/components',
                            `/employees/${employee?.id}/components`,
                          );
                        }}
                        color="white"
                      >
                        Mzdové zložky
                      </Button>
                    )}

                    <Button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleteInProgress}
                      color="red"
                    >
                      {isDeleteInProgress ? 'Odstraňovanie...' : 'Odstrániť zamestnanca'}
                    </Button>

                    <Button type="submit" disabled={isSubmitting || !isValid}>
                      {isSubmitting ? 'Ukladanie...' : 'Uložiť'}
                    </Button>
                  </PageHeader>

                  <Grid gridTemplateColumns={['auto', null, '300px auto']} gridGap="s6">
                    <SideMenu employee={employee} />

                    <Flex flexDirection="column">
                      {alertMessage && (
                        <Alert type={alertMessage.type}>{alertMessage.message}</Alert>
                      )}

                      <Panel title={resolveFormTypeTitle()}>
                        <EssentialInfo formType={formType} />
                      </Panel>
                    </Flex>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <Flex justifyContent="center" pt="s10">
            <Loader type="Puff" color={THEME.colors.blues[1]} height={80} width={80} />
          </Flex>
        )}
        ;
      </Content>
    </>
  );
};

/* getInitialProps - <EssentialInfoPage />
============================================================================= */
EssentialInfoPage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  checkAuthorization(ctx);

  return { employeeId: +ctx?.query?.id, formType: ctx?.query?.formType };
};

export default connect(state => state)(EssentialInfoPage);
