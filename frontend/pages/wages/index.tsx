import Head from 'next/head';
import Router from 'next/router';
import { NextPage } from 'next';
import { Users, DollarSign } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';

import { checkAuthorization } from '../../src/next';
import { Header, Content, PageHeader } from '../../src/components/shared/layout';
import { saveUserAction } from '../../src/actions/auth';
import { AppState } from '../../src/reducers';
import { Button } from '../../src/components/shared/misc';
import { selectUser } from '../../src/selectors/auth';
import { canCreateEmployee } from '../../src/api/shared/auth';
import { EmployeeList } from '../../src/components/employees';

/* Props - <WagesPage />
============================================================================= */
type Props = {
  accessToken: string;
};

/* <WagesPage />
============================================================================= */
const WagesPage: NextPage<Props> = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Head>
        <title>Mzdy - Payday</title>
      </Head>

      <Header />

      <Content>
        <PageHeader icon={<DollarSign />} title="Zoznam zamestnancov" subtitle="Mzdy">
          {canCreateEmployee(user) && (
            <Button
              onClick={() => {
                Router.push('/employee/create/[formType]', `/employee/create/personal`);
              }}
            >
              Vytvoriť nového zamestnanca
            </Button>
          )}
        </PageHeader>

        <EmployeeList mode="wage" />
      </Content>
    </>
  );
};

/* getInitialProps - <WagesPage />
============================================================================= */
WagesPage.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  return { accessToken };
};

export default connect(state => state)(WagesPage);
