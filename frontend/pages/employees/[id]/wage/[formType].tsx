import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Formik, Form } from 'formik';
import Router from 'next/router';
import Axios from 'axios';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup';

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
import { SideMenu, WageInfo } from '../../../../src/components/employees';
import { deleteEmployee, getWageData, createWageData } from '../../../../src/api/client/companies';
import { selectUser } from '../../../../src/selectors/auth';
import { getEmployee } from '../../../../src/api/client/companies';
import { AlertMessage } from '../../../../src/types/common';
import { THEME } from '../../../../src/theme';
import JwtDecode from 'jwt-decode';
import { User } from '../../../../src/types/auth';
import { canManageWageData } from '../../../../src/api/shared/auth';

/* Constants
============================================================================= */
const INITIAL_DATA = {
  druh: '',
  trieda: '',
  pracovna_doba_typ: '',
  kalendar_typ: '',
  uvazok: '',
  vypocet_sviatkov: '',
  pracovny_pomer_nad_5dni: false,
  pracovna_schopnost_znizena1: false,
  pracovna_schopnost_znizena2: false,
  pracovna_schopnost_znizena3: false,
  pracovna_kategoria: '',
  staticticky_udaj: '',
  specialna_kategoria: '',
  dochodca: false,
  dochodok_typ: '',
  pocet_deti: '',
  pocet_deti_do_6: '',
  danovy_odpocet_manzelka: false,
  danovy_bonus: false,
  nezdanitelne_min: false,
  zdravotna_poistovna: '',
  zc_zp: false,
  zc_sp_dp: false,
  zc_sp_np: false,
  zc_sp_pvn: false,
  zl_zp: false,
  zl_sp_dp: false,
  zl_sp_np: false,
  zl_sp_pvn: false,
  odbory: '',
};

/* Constants
============================================================================= */
const ValidationSchema = Yup.object().shape({
  druh: Yup.string().required('Políčko je povinné.'),
  trieda: Yup.string().required('Políčko je povinné.'),
  pracovna_doba_typ: Yup.string().required('Políčko je povinné.'),
  kalendar_typ: Yup.string().required('Políčko je povinné.'),
  uvazok: Yup.number()
    .positive()
    .required('Policko je povinné.'),
  vypocet_sviatkov: Yup.string().required('Políčko je povinné.'),
  pracovna_kategoria: Yup.string().required('Políčko je povinné.').max(1, 'Maximálne jeden znak.'),
  staticticky_udaj: Yup.string().required('Políčko je povinné.'),
  specialna_kategoria: Yup.string().required('Políčko je povinné.').max(1, 'Maximálne jeden znak.'),
  dochodok_typ: Yup.string().required('Políčko je povinné.'),
  pocet_deti: Yup.number()
    .positive()
    .required('Políčko je povinné.'),
  pocet_deti_do_6: Yup.number()
    .positive()
    .required('Políčko je povinné.'),
  zdravotna_poistovna: Yup.string().required('Políčko je povinné.'),
  tarif: Yup.number()
    .positive()
    .required('Políčko je povinné.'),
});

/* Props - <WageInfoPage />
============================================================================= */
type Props = {
  employeeId: number;
  formType: string | string[];
};

/* <WageInfoPage />
============================================================================= */
const WageInfoPage: NextPage<Props> = ({ employeeId, formType }) => {
  const [employee, setEmployee] = useState<any>(null);
  const [wageData, setWageData] = useState<any>(null);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getEmployee(user.companyId, employeeId).then(({ data: employee }) =>
      setEmployee(employee),
    );

    await getWageData(
      user.companyId,
      employeeId,
      moment().format('YYYY-MM-DD'),
    ).then(({ data: wageData }) =>
      setWageData(wageData),
    );
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
  const handleSubmit = async ({ id, kalendar_typ, uvazok, pocet_deti, pocet_deti_do_6, zdravotna_poistovna, tarif, ...values }) => {
    const wageDataOut = {
      platnost_od: moment().format('YYYY-MM-DD'),
      kalendar_typ: parseInt(kalendar_typ),
      uvazok: parseFloat(uvazok),
      pocet_deti: parseInt(pocet_deti),
      pocet_deti_do_6: parseInt(pocet_deti_do_6),
      zdravotna_poistovna: parseInt(zdravotna_poistovna),
      tarif: parseFloat(tarif),
      ...values,
    };

    await createWageData(user.companyId, employee.id, wageDataOut)
      .then(({ data }) => {
        setWageData(data);

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
      case 'employment': {
        return 'Pracovný pomer';
      }
      case 'tax': {
        return 'Dane';
      }
      case 'statistics': {
        return 'Štatistika';
      }
      case 'insurance': {
        return 'Poistenie';
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
              initialValues={
                wageData ?? {
                  platnost_od: moment().format('YYYY-MM-DD'),
                  ...INITIAL_DATA,
                }
              }
              onSubmit={handleSubmit}
              enableReinitialize
              validationSchema={ValidationSchema}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <PageHeader
                    icon={<Users />}
                    title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
                    subtitle="Mzdové údaje"
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
                        <WageInfo formType={formType} />
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

/* getInitialProps - <WageInfoPage />
============================================================================= */
WageInfoPage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  const { user } = JwtDecode<{ user: User }>(accessToken);
  if (!canManageWageData(user)) {
    if (ctx.req) {
      ctx.res.writeHead(401, { Location: '/' });
      ctx.res.end();
      return;
    } else {
      Router.push('/');
      return;
    }
  }

  return { employeeId: +ctx?.query?.id, formType: ctx?.query?.formType };
};

export default connect(state => state)(WageInfoPage);
