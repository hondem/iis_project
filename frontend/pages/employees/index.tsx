import Head from 'next/head';
import Router from 'next/router';
import { NextPage } from 'next';
import { Users } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';

import { checkAuthorization } from '../../src/next';
import { Header, Content, PageHeader, Flex } from '../../src/components/shared/layout';
import { saveUserAction } from '../../src/actions/auth';
import { AppState } from '../../src/reducers';
import { Button } from '../../src/components/shared/misc';
import { EmployeeList } from '../../src/components/employees';
import { selectUser } from '../../src/selectors/auth';
import { canCreateEmployee } from '../../src/api/shared/auth';

/* Props - <Employees />
============================================================================= */
type Props = {
  accessToken: string;
};

/* <Employees />
============================================================================= */
const Employees: NextPage<Props> = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Head>
        <title>Zamestnanci - Payday</title>
      </Head>

      <Header />

      <Content>
        <PageHeader icon={<Users />} title="Zoznam zamestnancov" subtitle="Zamestnanci">
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

        <EmployeeList />
      </Content>
    </>
  );
};

/* getInitialProps - <Employees />
============================================================================= */
Employees.getInitialProps = async (
  ctx: NextJSContext<AppState, saveUserAction>,
): Promise<Props> => {
  const accessToken = checkAuthorization(ctx);

  return { accessToken };
};

export default connect(state => state)(Employees);
