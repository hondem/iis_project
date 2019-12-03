import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { ChevronRight, Calendar as CalendarIcon, ChevronLeft, ArrowLeft } from 'react-feather';
import { connect, useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { Moment } from 'moment';
import Router from 'next/router';
import Loader from 'react-loader-spinner';

import { checkAuthorization } from '../../../src/next';
import {
  Header,
  Content,
  PageHeader,
  Panel,
  Flex,
  Grid,
} from '../../../src/components/shared/layout';
import { saveUserAction } from '../../../src/actions/auth';
import { AppState } from '../../../src/reducers';
import { Button } from '../../../src/components/shared/misc';
import {
  getEmployee,
  getEmployeesComponents,
  createComponent,
  deleteComponent,
} from '../../../src/api/client/companies';
import { selectUser } from '../../../src/selectors/auth';
import { THEME } from '../../../src/theme';
import JwtDecode from 'jwt-decode';
import { User } from '../../../src/types/auth';
import { canManageWageData } from '../../../src/api/shared/auth';

/* Constants & local types
============================================================================= */
type ComponentType =
  | {
      label: 'Dovolenka';
      code: 1;
    }
  | {
      label: 'Sickday';
      code: 2;
    };

const COMPONENT_TYPES: ComponentType[] = [
  {
    label: 'Dovolenka',
    code: 1,
  },
  {
    label: 'Sickday',
    code: 2,
  },
];

/* Props - <ComponentTypeSwitch />
============================================================================= */
type ComponentTypeSwitchProps = {
  activeComponentType: ComponentType;
  onComponentTypeChange: (activeComponentType: ComponentType) => void;
};

/* <ComponentTypeSwitch />
============================================================================= */
const ComponentTypeSwitch: React.FunctionComponent<ComponentTypeSwitchProps> = ({
  activeComponentType,
  onComponentTypeChange,
}) => {
  if (activeComponentType.code === 1) {
    return (
      <Button onClick={() => onComponentTypeChange({ label: 'Sickday', code: 2 })} color="white">
        {'🏖️'} {activeComponentType.label}
      </Button>
    );
  } else if (activeComponentType.code === 2) {
    return (
      <Button onClick={() => onComponentTypeChange({ label: 'Dovolenka', code: 1 })} color="white">
        {'🤒'} {activeComponentType.label}
      </Button>
    );
  }
};

/* Props - <Components />
============================================================================= */
type Props = {
  employeeId: number;
};

/* <Components />
============================================================================= */
const Components: NextPage<Props> = ({ employeeId }) => {
  moment.locale('sk');
  const initialDate = moment();
  initialDate.set('date', 1);

  const [activeDate, setActiveDate] = useState<Moment>(initialDate);
  const [activeComponentType, setActiveComponentType] = useState<ComponentType>(COMPONENT_TYPES[0]);
  const [employee, setEmployee] = useState<any>(null);
  const [components, setComponents] = useState<any[]>(null);
  const localizer = momentLocalizer(moment);
  const user = useSelector(selectUser);

  useEffect(() => {
    getEmployee(user.companyId, employeeId).then(({ data: employee }) => {
      setEmployee(employee);
    });
  }, []);

  useEffect(() => {
    fetchComponents();
  }, [activeDate]);

  /**
   * Fetches employee's components for active month.
   */
  const fetchComponents = async () => {
    await getEmployeesComponents(user?.companyId, employeeId, activeDate.format('YYYY-MM-DD')).then(
      ({ data: components }) => {
        setComponents(components);
      },
    );
  };

  /**
   * Handles calendar slot select action.
   */
  const handleSlotSelect = ({ start, end }) => {
    const component = {
      kod: activeComponentType.code,
      kod_ext: '',
      datum_od: moment(start).format('YYYY-MM-DD'),
      datum_do: moment(end).format('YYYY-MM-DD'),
      pozn: activeComponentType.label,
    };

    createComponent(user?.companyId, employeeId, component).then(() => {
      fetchComponents();
    });
  };

  /**
   * Handles click on calendar event.
   */
  const handleEventClick = async event => {
    let confirmation = confirm(`Určite chcete odstrániť túto mzdovú zložku?`);

    if (confirmation) {
      await deleteComponent(user.companyId, employeeId, event.resource).then(() =>
        fetchComponents(),
      );
    }
  };

  return (
    <>
      <Header />

      <Content>
        {employee !== null && components !== null ? (
          <>
            <Head>
              <title>
                {employee.osobni.meno} {employee.osobni.priezvisko} | Mzdové zložky - Payday
              </title>
            </Head>
            <PageHeader
              icon={<CalendarIcon />}
              title={`${employee.osobni.meno} ${employee.osobni.priezvisko}`}
              subtitle="Mzdové zložky"
            >
              <Button
                onClick={() => {
                  Router.push(
                    '/employees/[id]/essential/personal',
                    `/employees/${employeeId}/essential/personal`,
                  );
                }}
                color="white"
                display={['none', null, null, 'block']}
              >
                <span>Späť na profil zamestnanca</span>
              </Button>

              <ComponentTypeSwitch
                activeComponentType={activeComponentType}
                onComponentTypeChange={setActiveComponentType}
              />

              <Button
                onClick={() => {
                  setActiveDate(moment(activeDate).subtract(1, 'month'));
                }}
              >
                <ChevronLeft />
              </Button>

              <span>{activeDate.format('MM/YYYY')}</span>

              <Button
                onClick={() => {
                  setActiveDate(moment(activeDate).add(1, 'month'));
                }}
              >
                <ChevronRight />
              </Button>
            </PageHeader>

            <Panel isPadded={false}>
              <Calendar
                selectable
                localizer={localizer}
                events={components.map(component => ({
                  title: component.pozn,
                  start: moment(component.datum_od, 'YYYY-MM-DD').toDate(),
                  end: moment(component.datum_do, 'YYYY-MM-DD').toDate(),
                  allDay: true,
                  resource: component.id,
                }))}
                startAccessor="start"
                endAccessor={({ end }) => new Date(end.getTime() + 1)}
                views={['month']}
                toolbar={false}
                date={activeDate.toDate()}
                onNavigate={() => null}
                onSelectSlot={handleSlotSelect}
                onSelectEvent={handleEventClick}
                style={{ height: `calc(100vh - 260px)` }}
              />
            </Panel>
          </>
        ) : (
          <Flex justifyContent="center" pt="s10">
            <Loader type="Puff" color={THEME.colors.blues[1]} height={80} width={80} />
          </Flex>
        )}
      </Content>
    </>
  );
};

/* getInitialProps - <Components />
============================================================================= */
Components.getInitialProps = async (
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

  return { employeeId: +ctx?.query?.id };
};

export default connect(state => state)(Components);
